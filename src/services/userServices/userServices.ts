import { ResponseDetails } from "../../types/generalTypes";
import { userDatabase, generalHelpers } from "../../helpers";
import { mailUtilities, errorUtilities } from "../../utilities";
import { Roles } from "../../types/modelTypes";
import { v4 } from "uuid";
import walletDatabaseHelperHelpers from "../../helpers/databaseHelpers/walletDatabaseHelper.helpers";
import followersDatabaseHelpersHelpers from "../../helpers/databaseHelpers/followersDatabaseHelpers.helpers";
import followingsDatabaseHelpersHelpers from "../../helpers/databaseHelpers/followingsDatabaseHelpers.helpers";
import { Transaction } from "sequelize";
import performTransaction from "../../middlewares/databaseTransactions.middleware";


const userSwitchesToHostService = errorUtilities.withErrorHandling(
    async (userPayload: Record<string, any>): Promise<Record<string, any>> => {
      const responseHandler: ResponseDetails = {
        statusCode: 0,
        message: "",
        data: {},
        details: {},
        info: {},
      };

      return responseHandler

    }
)





export default {
  userSwitchesToHostService,
}