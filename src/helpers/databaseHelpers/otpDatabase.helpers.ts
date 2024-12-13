import { Transaction } from "sequelize";
import Otp from "../../models/otp/otpModel";

const otpDatabaseHelper = {

  create: async (data: any, transaction?: Transaction) => {
    try {
      const newOtp = await Otp.create(data, { transaction });
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
  },

  updateOne: async (filter: any, update: any, transaction?: Transaction) => {
    try {
      const otp:any = await Otp.findOne({ where: filter });
      await otp.update(update, { transaction });
      return otp;
    } catch (error: any) {
      throw new Error(`Error updating User: ${error.message}`);
    }
  },
  
};

export default {
    otpDatabaseHelper,
};
