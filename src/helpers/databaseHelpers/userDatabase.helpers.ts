import { Transaction } from "sequelize";
import User from "../../models/users/usersModel";
import Wallet from "../../models/wallets/walletModel";
import Followings from "../../models/followings/followingsModel";
import Followers from "../../models/followers/followersModel";
import { errorUtilities } from "../../utilities";

const userDatabaseHelper = {

  create: async (data: any, transaction?:Transaction) => {
    try {
      const newUser = await User.create(data, { transaction });
      return newUser;
    } catch (error: any) {
      throw new Error(`Error creating User: ${error.message}`);
    }
  },

  updateOne: async (filter: any, update: any, transaction?: Transaction) => {
    try {
      const user:any = await User.findOne({ where: filter });
      await user.update(update, { transaction });
      return user;
    } catch (error: any) {
      throw new Error(`Error updating User: ${error.message}`);
    }
  },
  

  updateMany: async (filter: any, update: any) => {
    try {
      const [affectedRows] = await User.update(update, { where: filter });
      return { affectedRows };
    } catch (error: any) {
      throw new Error(`Error updating Users: ${error.message}`);
    }
  },

  deleteOne: async (filter: any) => {
    try {
      const user = await User.findOne({ where: filter });
      if (!user) throw new Error("User not found");
      await user.destroy();
      return user;
    } catch (error: any) {
      throw new Error(`Error deleting User: ${error.message}`);
    }
  },

  deleteMany: async (filter: any) => {
    try {
      const affectedRows = await User.destroy({ where: filter });
      return { affectedRows };
    } catch (error: any) {
      throw new Error(`Error deleting Users: ${error.message}`);
    }
  },

  getOne: async (filter: Record<string, any>, projection: any = null, include: boolean = false) => {
    try {
      const user = await User.findOne({
        where: filter,
        attributes: projection,
        include: include ? [
          { model: Wallet, as: 'wallet' },
          { model: Followers, as: 'userFollowers' },
          { model: Followings, as: 'userFollowings' }
        ] : []
      });
      if(!user){
        throw errorUtilities.createError("User not found", 404);
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error fetching User: ${error.message}`);
    }
  },
  

  getMany: async (filter: any, projection?: any, options?: any) => {
    try {
      const users = await User.findAll({
        where: filter,
        attributes: projection,
        ...options,
      });
      return users;
    } catch (error: any) {
      throw new Error(`Error fetching Users: ${error.message}`);
    }
  },

  extractUserDetails: async (userData: Record<string, any>) => {
    try {
      return {
        email: userData.email,
        fullName: userData.fullName,
        userName: userData.userName,
        role: userData.role,
        phone: userData.phone,
        isVerified: userData.isVerified,
        refreshToken: userData.refreshToken,
        numberOfEventsHosted: userData.numberOfEventsHosted,
        numberOfEventsAttended: userData.numberOfEventsAttended,
        bio: userData.bio,
        userImage: userData.userImage,
        country: userData.country,
        isBlacklisted: userData.isBlacklisted,
        subscriptionPlan: userData.subscriptionPlan,
        accountStatus: userData.accountStatus,
        interests: userData.interests,
        noOfFollowers: userData.noOfFollowers,
        noOfFollowings: userData.noOfFollowings,
        id:userData.id
      };
    } catch (error: any) {
      throw new Error(`Error fetching Users: ${error.message}`);
    }
  },
  
};

export default {
  userDatabaseHelper,
};
