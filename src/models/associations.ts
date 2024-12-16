import Wallet from "./wallets/walletModel";
import User from "./users/usersModel";
import Otp from "./otp/otpModel";
import Followers from "./followers/followersModel";
import Followings from "./followings/followingsModel";
import Events from "./events/eventsModel";

User.hasMany(Otp, {
  foreignKey: 'userId',
  as: 'userOtp',
});

Otp.belongsTo(User, {
  foreignKey: 'userId',
  as: 'otpUser',
});

User.hasOne(Wallet, {
  foreignKey: 'userId',
  as: 'wallet',
});

Wallet.belongsTo(User, {
  foreignKey: 'userId',
  as: 'walletUser',
});

User.hasOne(Followers, {
  foreignKey: 'userId',
  as: 'userFollowers',
});

Followers.belongsTo(User, {
  foreignKey: 'userId',
  as: 'followerUser',
});

User.hasOne(Followings, {
  foreignKey: "userId",
  as: "userFollowings",
});

Followings.belongsTo(User, {
  foreignKey: "userId",
  as: "followingUser",
});

Events.belongsTo(User, {
  foreignKey: "userId",
  as: "events",
});

User.hasMany(Events, {
  foreignKey: "userId",
  as: "userEvents",
})
