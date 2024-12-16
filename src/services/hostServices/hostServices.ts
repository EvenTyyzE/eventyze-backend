import { ResponseDetails } from "../../types/generalTypes";
import { userDatabase } from "../../helpers";
import { errorUtilities } from "../../utilities";
import validator from "validator";
import { JwtPayload } from "jsonwebtoken";
import { Roles } from "../../types/modelTypes";

const getAllHostsService = errorUtilities.withErrorHandling(
  async (): Promise<Record<string, any>> => {
    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
      data: {},
      details: {},
      info: {},
    };

    const projection = [
        "id",
        "fullName",
        "userName",
        "numberOfEventsHosted",
        "numberOfEventsAttended",
        "userImage",
        "noOfFollowers"
    ]

    const hosts: any = await userDatabase.userDatabaseHelper.getMany({role:Roles.Host}, projection);

    if(!hosts || hosts.length === 0){
        responseHandler.statusCode = 404;
        responseHandler.message = "No hosts found";
        responseHandler.data = {
            hosts
        }
        return responseHandler;
    }

    responseHandler.statusCode = 200;
    responseHandler.message = "Profile updated successfully";
    responseHandler.data = {
      hosts
    };
    return responseHandler;
  }
);

export default {
    getAllHostsService,
}