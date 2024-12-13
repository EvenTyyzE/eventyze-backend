import { Transaction, Sequelize } from "sequelize";
import { database } from "../configurations/database";

const performTransaction = async (
    operations: ((transaction: Transaction) => Promise<void>)[]
  ) => {
    const sequelize: Sequelize = database;
  
    const transaction = await sequelize.transaction();
  
    try {
      for (const operation of operations) {
        await operation(transaction);
      }
  
      await transaction.commit();
      console.log("Transaction committed successfully");
    } catch (error: any) {
      await transaction.rollback();
      console.error("Transaction aborted due to an error:", error.message);
      throw new Error(`An error occured, please try again`);
    }
  };
  
  export default {
    performTransaction,
  };
  