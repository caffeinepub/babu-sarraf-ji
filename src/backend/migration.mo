import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

module {
  type OldUserProfile = {
    displayName : Text;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type NewUserProfile = {
    displayName : Text;
    email : ?Text;
    photoUrl : ?Text;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldProfile) {
        {
          displayName = oldProfile.displayName;
          email = null;
          photoUrl = null;
        };
      }
    );
    { userProfiles = newUserProfiles };
  };
};
