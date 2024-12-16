import { Request, Response } from "express";
import { userEmailAuthService, userServices } from "../../services";
import { responseUtilities } from "../../utilities";
import { JwtPayload } from "jsonwebtoken";

const updateUserProfile = async (
  request: JwtPayload,
  response: Response
): Promise<any> => {

    const { id } = request.user

  const newUser: any = await userServices.userProfileUpdateService(
    { ...request.body, id }
  );

  return responseUtilities.responseHandler(
    response,
    newUser.message,
    newUser.statusCode,
    newUser.details,
    newUser.data
  );
};


export default {
    updateUserProfile,
}