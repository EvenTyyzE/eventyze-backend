import { Request, Response } from "express";
import { hostServices } from "../../services";
import { responseUtilities } from "../../utilities";
import { JwtPayload } from "jsonwebtoken";

const allHosts = async (
  request: JwtPayload,
  response: Response
): Promise<any> => {

  const newUser: any = await hostServices.getAllHostsService();

  return responseUtilities.responseHandler(
    response,
    newUser.message,
    newUser.statusCode,
    newUser.details,
    newUser.data
  );
};


export default {
    allHosts,
}