import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type UserProfile = {
    displayName : Text;
    email : ?Text;
    photoUrl : ?Text;
  };

  type Comment = {
    id : Nat;
    author : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  type CommentView = {
    id : Nat;
    author : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  type Post = {
    id : Nat;
    author : Principal;
    image : Storage.ExternalBlob;
    caption : Text;
    timestamp : Time.Time;
    likes : Nat;
    likedBy : List.List<Principal>;
    comments : List.List<Comment>;
  };

  type PostView = {
    id : Nat;
    author : Principal;
    image : Storage.ExternalBlob;
    caption : Text;
    timestamp : Time.Time;
    likes : Nat;
    likedBy : [Principal];
    comments : [CommentView];
  };

  type ChatMessage = {
    id : Nat;
    author : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  type ChatMessageView = {
    id : Nat;
    author : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  type TestCategory = {
    #mockTest;
    #previousYearPaperYear : Nat;
  };

  type TestResult = {
    exam : Text;
    category : TestCategory;
    subCategory : ?Text;
    timestamp : Time.Time;
    totalQuestions : Nat;
    correctCount : Nat;
    incorrectCount : Nat;
    score : Nat;
    accuracy : Nat;
  };

  type DailyTask = {
    day : Text;
    target : Text;
    completed : Bool;
    timestamp : Time.Time;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let posts = Map.empty<Nat, Post>();
  let chatMessages = Map.empty<Nat, ChatMessage>();
  let blockedUsers = Map.empty<Principal, Bool>();
  let testHistories = Map.empty<Principal, List.List<TestResult>>();
  let dashboardBackground = Map.empty<Principal, Storage.ExternalBlob>();
  let dailyTasks = Map.empty<Principal, DailyTask>();

  var nextPostId = 0;
  var nextCommentId = 0;
  var nextChatMessageId = 0;

  // Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Community Posts
  public shared ({ caller }) func createPost(image : Storage.ExternalBlob, caption : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create posts");
    };

    let postId = nextPostId;
    nextPostId += 1;

    let newPost : Post = {
      id = postId;
      author = caller;
      image;
      caption;
      timestamp = Time.now();
      likes = 0;
      likedBy = List.empty<Principal>();
      comments = List.empty<Comment>();
    };

    posts.add(postId, newPost);
    postId;
  };

  public query ({ caller }) func getAllPosts() : async [PostView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view posts");
    };
    let postArray = posts.toArray();
    postArray.map(func((_, post)) { toPostView(post) });
  };

  public shared ({ caller }) func likePost(postId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can like posts");
    };

    switch (posts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) {
        for (p in post.likedBy.values()) {
          if (p == caller) {
            Runtime.trap("You have already liked this post");
          };
        };

        let updatedPost = {
          post with
          likes = post.likes + 1;
        };
        posts.add(postId, updatedPost);
      };
    };
  };

  // Comments
  public shared ({ caller }) func addComment(postId : Nat, content : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can comment");
    };

    switch (posts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) {
        let commentId = nextCommentId;
        nextCommentId += 1;

        let newComment : Comment = {
          id = commentId;
          author = caller;
          content;
          timestamp = Time.now();
        };

        let updatedPost = {
          post with
          comments = post.comments;
        };

        posts.add(postId, updatedPost);
        commentId;
      };
    };
  };

  public query ({ caller }) func getComments(postId : Nat) : async [CommentView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view comments");
    };
    switch (posts.get(postId)) {
      case (null) { [] };
      case (?post) {
        toPostView(post).comments;
      };
    };
  };

  // Chat Messages
  public shared ({ caller }) func sendMessage(content : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send messages");
    };

    let messageId = nextChatMessageId;
    nextChatMessageId += 1;

    let newMessage : ChatMessage = {
      id = messageId;
      author = caller;
      content;
      timestamp = Time.now();
    };

    chatMessages.add(messageId, newMessage);
    messageId;
  };

  public query ({ caller }) func getChatMessages() : async [ChatMessageView] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view chat messages");
    };
    let messageArray = chatMessages.toArray();
    messageArray.map(func((_, message)) { toChatMessageView(message) });
  };

  // Admin Functions
  public shared ({ caller }) func deletePost(postId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete posts");
    };
    posts.remove(postId);
  };

  public shared ({ caller }) func deleteComment(postId : Nat, commentId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete comments");
    };

    switch (posts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) {
        let filteredComments = post.comments.filter(
          func(comment : Comment) : Bool { comment.id != commentId }
        );
        let updatedPost = { post with comments = filteredComments };
        posts.add(postId, updatedPost);
      };
    };
  };

  public shared ({ caller }) func deleteChatMessage(messageId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete messages");
    };
    chatMessages.remove(messageId);
  };

  public shared ({ caller }) func blockUser(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can block users");
    };
    blockedUsers.add(user, true);
  };

  public shared ({ caller }) func unblockUser(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can unblock users");
    };
    blockedUsers.remove(user);
  };

  func toCommentView(comment : Comment) : CommentView {
    {
      id = comment.id;
      author = comment.author;
      content = comment.content;
      timestamp = comment.timestamp;
    };
  };

  func toChatMessageView(message : ChatMessage) : ChatMessageView {
    {
      id = message.id;
      author = message.author;
      content = message.content;
      timestamp = message.timestamp;
    };
  };

  func toPostView(post : Post) : PostView {
    let likedByArray = post.likedBy.toArray();
    let commentArray = post.comments.toArray().map(func(comment) { toCommentView(comment) });

    {
      id = post.id;
      author = post.author;
      image = post.image;
      caption = post.caption;
      timestamp = post.timestamp;
      likes = post.likes;
      likedBy = likedByArray;
      comments = commentArray;
    };
  };

  // Test Series result handling
  public shared ({ caller }) func saveTestResult(result : TestResult) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save test results");
    };

    let testHistory = switch (testHistories.get(caller)) {
      case (null) { List.empty<TestResult>() };
      case (?history) { history };
    };

    testHistory.add(result);
    testHistories.add(caller, testHistory);
  };

  public query ({ caller }) func getTestHistory() : async [TestResult] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access test history");
    };

    switch (testHistories.get(caller)) {
      case (null) { [] };
      case (?history) { history.toArray() };
    };
  };

  // Dashboard background image customization
  public shared ({ caller }) func saveDashboardBackground(image : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save dashboard backgrounds");
    };
    dashboardBackground.add(caller, image);
  };

  public query ({ caller }) func getDashboardBackground() : async ?Storage.ExternalBlob {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get dashboard backgrounds");
    };
    dashboardBackground.get(caller);
  };

  public shared ({ caller }) func clearDashboardBackground() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear dashboard backgrounds");
    };
    dashboardBackground.remove(caller);
  };

  // Daily Target Functionality
  public shared ({ caller }) func setDailyTarget(day : Text, target : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set daily targets");
    };

    let newDailyTask : DailyTask = {
      day;
      target;
      completed = false;
      timestamp = Time.now();
    };

    dailyTasks.add(caller, newDailyTask);
  };

  public query ({ caller }) func getDailyTarget() : async ?DailyTask {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get daily targets");
    };
    dailyTasks.get(caller);
  };

  public query ({ caller }) func getDailyTaskStatus(day : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get task status");
    };

    switch (dailyTasks.get(caller)) {
      case (null) {
        "Incomplete" : Text;
      };
      case (?task) {
        if (task.day == day and task.completed) {
          "Complete" : Text;
        } else {
          "Incomplete" : Text;
        };
      };
    };
  };

  public shared ({ caller }) func markDailyTargetCompleted(day : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can mark tasks as completed");
    };

    switch (dailyTasks.get(caller)) {
      case (null) {
        Runtime.trap("No daily task set for this day. Please set a daily target first!");
      };
      case (?dailyTask) {
        if (dailyTask.day != day) {
          Runtime.trap("No daily task set for this day. Please set a daily target first!");
        };
        if (dailyTask.completed) {
          Runtime.trap("Task for the day is already marked as completed!");
        };
        let updatedTask : DailyTask = {
          dailyTask with completed = true; timestamp = Time.now();
        };
        dailyTasks.add(caller, updatedTask);
      };
    };
  };
};
