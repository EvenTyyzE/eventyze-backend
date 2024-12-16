import { ResponseDetails } from "../../types/generalTypes";
import { userDatabase, generalHelpers } from "../../helpers";
import { mailUtilities, errorUtilities } from "../../utilities";
import validator from "validator";
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

    const { id } = profilePayload;

    const user: any = await userDatabase.userDatabaseHelper.getOne({id});

    if (
      (!profilePayload.userName || profilePayload.userName === "") &&
      (!profilePayload.bio || profilePayload.bio === "") &&
      (!profilePayload.interests ||
        !Array.isArray(profilePayload.interests) ||
        profilePayload.interests.length === 0) &&
      (!profilePayload.phone || profilePayload.phone === "") &&
      (!profilePayload.fullName || profilePayload.fullName === "") &&
      (!profilePayload.country || profilePayload.country === "")
    ) {
      throw errorUtilities.createError(
        "At least one field must be selected for update",
        400
      );
    }

    let updateDetails: Record<string, any> = {};

    if (profilePayload.userName) {
      if (profilePayload.userName === user.userName) {
        throw errorUtilities.createError(
          "This is your current username, please choose another username if you wish to change it",
          400
        );
      }
      const confirmUserName = await userDatabase.userDatabaseHelper.getOne(
        { userName: profilePayload.userName },
        ["userName"]
      );

      if (confirmUserName) {
        throw errorUtilities.createError(
          "Username unavailable, please choose another username",
          400
        );
      }

      updateDetails.userName = profilePayload.userName;
    }

    if (profilePayload.bio) {
      updateDetails.bio = profilePayload.bio;
    }

    if (profilePayload.interests) {
      updateDetails.interests = profilePayload.interests;
    }

    if (profilePayload.phone) {
      if (!validator.isMobilePhone(profilePayload.phone, "any")) {
        throw errorUtilities.createError("Invalid phone number", 400);
      }
      updateDetails.phone = profilePayload.phone;
    }

    if (profilePayload.fullName) {
      updateDetails.fullName = profilePayload.fullName;
    }

    if (profilePayload.country) {
      updateDetails.country = profilePayload.country;
    }

    const newUser = await userDatabase.userDatabaseHelper.updateOne(
      { id },
      profilePayload
    );

    responseHandler.statusCode = 200;
    responseHandler.message = "Profile updated successfully";
    responseHandler.data = {
      user: newUser,
    };
    return responseHandler;
  }
);



const userSwitchesToHostService = errorUtilities.withErrorHandling(
  async (userPayload: Record<string, any>): Promise<Record<string, any>> => {
    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
      data: {},
      details: {},
      info: {},
    };

    return responseHandler;
  }
);

export default {
  userProfileUpdateService,
  userSwitchesToHostService,
};
