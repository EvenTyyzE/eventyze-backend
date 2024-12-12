import { Transaction } from "sequelize";
import Followers from "../../models/followers/followersModel";

const followersDatabaseHelpers = {

  create: async (data: any, transaction?:Transaction) => {
    try {
      const newOtp = await Followers.create(data, { transaction });
      return newOtp;
    } catch (error: any) {
      throw new Error(`Error creating user followers: ${error.message}`);
    }
  },
  
};

export default {
    followersDatabaseHelpers,
};
