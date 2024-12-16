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


const userProfileUpdateService = errorUtilities.withErrorHandling(
  async (profilePayload: Record<string, any>): Promise<Record<string, any>> => {
    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
      data: {},
      details: {},
      info: {},
    };

    const { userId } = profilePayload

    if (
      (!profilePayload.userName || profilePayload.userName === "") &&
      (!profilePayload.bio || profilePayload.bio === "") &&
      (!profilePayload.interests || profilePayload.interests === "") 
    ) {
      throw errorUtilities.createError(
        "At least one field must be selected for update",
        400
      );
    }

    let updateDetails: Record<string, any> = {};

    if (profilePayload.userName) {
      updateDetails.userName = profilePayload.userName;
    }

    if (profilePayload.bio) {
      updateDetails.bio = profilePayload.bio;
    }

    if (profilePayload.interests) {
      updateDetails.interests = profilePayload.interests;
    }

    const newUser = await userDatabase.userDatabaseHelper.updateOne({id:userId}, profilePayload)

    responseHandler.statusCode = 200;
    responseHandler.message = "Profile updated successfully";
    responseHandler.data = {
      user: newUser
    };
    return responseHandler;

  }
)

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
  userProfileUpdateService,
  userSwitchesToHostService,
}