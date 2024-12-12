import { Transaction } from "sequelize";
import Wallet from "../../models/wallets/walletModel";

const walletDatabaseHelpers = {

  create: async (data: any, transaction?:Transaction) => {
    try {
      const newOtp = await Wallet.create(data, { transaction });
      return newOtp;
    } catch (error: any) {
      throw new Error(`Error creating user wallet: ${error.message}`);
    }
  },
  
};

export default {
    walletDatabaseHelpers,
};
