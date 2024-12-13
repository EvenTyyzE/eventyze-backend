import { Request, Response } from "express";
import { userEmailAuthService } from "../../services";
import { responseUtilities } from "../../utilities";
import { JwtPayload } from "jsonwebtoken";

const userRegisterWithEmail = async (
  request: Request,
  response: Response
): Promise<any> => {
  const newUser: any = await userEmailAuthService.userRegisterWithEmailService(
    request.body
  );

  return responseUtilities.responseHandler(
    response,
    newUser.message,
    newUser.statusCode,
    newUser.details,
    newUser.data
  );
};


const userVerifiesOtp = async (
  request: JwtPayload,
  response: Response
): Promise<any> => {

  const newUser: any = await userEmailAuthService.userVerifiesOtp(
   request.body
  );

  return responseUtilities.responseHandler(
    response,
    newUser.message,
    newUser.statusCode,
    newUser.details,
    newUser.data
  );
};

const userLoginWithEmail = async (
  request: Request,
  response: Response
): Promise<any> => {
  const loggedInUser: any = await userEmailAuthService.userLogin(request.body);

  if(loggedInUser.statusCode === 200){
  response
    .header("x-access-token", loggedInUser.data.accessToken)
    .header("x-refresh-token", loggedInUser.data.refreshToken);
  }
  
  return responseUtilities.responseHandler(
    response,
    loggedInUser.message,
    loggedInUser.statusCode,
    loggedInUser.details,
    loggedInUser.data,
  );
};

const userResendsOtp = async (
  request: Request,
  response: Response
): Promise<any> => {

  const { email, userId } = request.query

  const resentOtp: any = await userEmailAuthService.userResendsOtpService({ email, userId });
  
  return responseUtilities.responseHandler(
    response,
    resentOtp.message,
    resentOtp.statusCode,
    resentOtp.details,
    resentOtp.data,
  );
};

export default {
  userRegisterWithEmail,
  userVerifiesOtp,
  userLoginWithEmail,
  userResendsOtp
};
