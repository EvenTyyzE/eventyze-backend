import Wallet from "./wallets/walletModel";
import User from "./users/usersModel";
import Otp from "./otp/otpModel";
import Followers from "./followers/followersModel";
import Followings from "./followings/followingsModel";

User.hasMany(Otp, {
    foreignKey: 'userId',
    as: 'otp',
});

  Otp.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});


User.hasOne(Wallet, {
  foreignKey: 'userId',
  as: 'wallet'
})

Wallet.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})


User.hasOne(Followers, {
  foreignKey: 'userId',
  as: 'followers'
})

Followers.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})


User.hasOne(Followings, {
  foreignKey: "userId",
  as: "followings",
});

Followings.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});




