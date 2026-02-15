import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";

module {
  // Old types
  type OldUserProfile = {
    displayName : Text;
  };

  type OldComment = {
    id : Nat;
    author : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  type OldPost = {
    id : Nat;
    author : Principal;
    image : Storage.ExternalBlob;
    caption : Text;
    timestamp : Time.Time;
    likes : Nat;
    likedBy : List.List<Principal>;
    comments : List.List<OldComment>;
  };

  type OldChatMessage = {
    id : Nat;
    author : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  type OldTestResult = {
    exam : Text;
    category : Text;
    timestamp : Time.Time;
    totalQuestions : Nat;
    correctCount : Nat;
    incorrectCount : Nat;
    score : Nat;
    accuracy : Nat;
  };

  // Old actor type
  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
    posts : Map.Map<Nat, OldPost>;
    chatMessages : Map.Map<Nat, OldChatMessage>;
    blockedUsers : Map.Map<Principal, Bool>;
    testHistories : Map.Map<Principal, List.List<OldTestResult>>;
    nextPostId : Nat;
    nextCommentId : Nat;
    nextChatMessageId : Nat;
  };

  // New types (same as old)
  type NewUserProfile = OldUserProfile;
  type NewComment = OldComment;
  type NewPost = OldPost;
  type NewChatMessage = OldChatMessage;
  type NewTestResult = OldTestResult;

  // New actor type
  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    posts : Map.Map<Nat, NewPost>;
    chatMessages : Map.Map<Nat, NewChatMessage>;
    blockedUsers : Map.Map<Principal, Bool>;
    testHistories : Map.Map<Principal, List.List<NewTestResult>>;
    nextPostId : Nat;
    nextCommentId : Nat;
    nextChatMessageId : Nat;
    dashboardBackground : Map.Map<Principal, Storage.ExternalBlob>; // New field
  };

  // Migration function called by the main actor via the `with` clause
  public func run(old : OldActor) : NewActor {
    {
      old with
      dashboardBackground = Map.empty<Principal, Storage.ExternalBlob>();
    };
  };
};
