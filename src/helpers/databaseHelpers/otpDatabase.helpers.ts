import { Transaction } from "sequelize";
import Otp from "../../models/otp/otpModel";

const otpDatabaseHelper = {

  create: async (data: any) => {
    try {
      const newOtp = await Otp.create(data);
      return newOtp;
    } catch (error: any) {
      throw new Error(`Error creating User: ${error.message}`);
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
  }
  
};

export default {
    otpDatabaseHelper,
};
