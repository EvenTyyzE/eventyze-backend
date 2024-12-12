import { Transaction } from "sequelize";
import User from "../../models/users/usersModel";

const userDatabaseHelper = {

  create: async (data: any) => {
    try {
      const newUser = await User.create(data);
      return newUser;
    } catch (error: any) {
      throw new Error(`Error creating User: ${error.message}`);
    }
  },

  updateOne: async (filter: any, update: any, transaction?: Transaction) => {
    try {
      const user = await User.findOne({ where: filter });
      if (!user) throw new Error("User not found");
      await user.update(update);
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

  getOne: async (filter: Record<string, any>, projection?: any) => {
    try {
      const user = await User.findOne({
        where: filter,
        attributes: projection,
      });
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
        noOfMovies: userData.numberOfMoviesAdded,
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
