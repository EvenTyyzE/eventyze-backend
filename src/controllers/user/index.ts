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

const changeUserImage = async (
  request: JwtPayload,
  response: Response
): Promise<any> => {

  const newUserImage: any = await userServices.updateUserImageService(request)

  return responseUtilities.responseHandler(
    response,
    newUserImage.message,
    newUserImage.statusCode,
    newUserImage.data,
    newUserImage.details
  );
};


export default {
    updateUserProfile,
    changeUserImage
}