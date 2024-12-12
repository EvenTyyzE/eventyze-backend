import { Transaction } from "sequelize";
import Otp from "../../models/otp/otpModel";

const otpDatabaseHelper = {

  create: async (data: any) => {
    try {
      const newUser = await Otp.create(data);
      return newUser;
    } catch (error: any) {
      throw new Error(`Error creating User: ${error.message}`);
    }
  },

  deleteOne: async (filter: any) => {
    try {
      const user = await Otp.findOne({ where: filter });
      if (!user) throw new Error("User not found");
      await user.destroy();
      return user;
    } catch (error: any) {
      throw new Error(`Error deleting User: ${error.message}`);
    }
  },

  deleteMany: async (filter: any) => {
    try {
      const affectedRows = await Otp.destroy({ where: filter });
      return { affectedRows };
    } catch (error: any) {
      throw new Error(`Error deleting Users: ${error.message}`);
    }
  },

  getOne: async (filter: Record<string, any>, projection?: any) => {
    try {
      const user = await Otp.findOne({
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
      const users = await Otp.findAll({
        where: filter,
        attributes: projection,
        ...options,
      });
      return users;
    } catch (error: any) {
      throw new Error(`Error fetching Users: ${error.message}`);
    }
  },
  
};

export default {
    otpDatabaseHelper,
};
