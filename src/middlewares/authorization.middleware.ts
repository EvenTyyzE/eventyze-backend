import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {APP_SECRET} from '../configurations/envKeys';
import { generalHelpers, userDatabase } from '../helpers';

export const generalAuthFunction = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction,
): Promise<any> => {
  try {

    const authorizationHeader = request.headers.authorization;

    const refreshToken = request.headers['x-refresh-token'];

    if (!authorizationHeader) {
      return response.status(401).json({
        message: 'No Authorization header provided, please login again',
      });
    }

    const authorizationToken = authorizationHeader.split(' ')[1];

    if (!authorizationToken) {
      return response.status(401).json({
        status: 'Failed',
        message: 'Login required',
      });
    }

    let verifiedUser:any;
    try {
      verifiedUser = jwt.verify(authorizationToken, `${APP_SECRET}`);
    } catch (error: any) {

      if (error.message === 'jwt expired') {

        if (!refreshToken) {
          return response.status(401).json({
            status: 'error',
            message: 'Access Token Expired. Please log in again.',
          });

        }

        let refreshVerifiedUser:any;
        try {
          refreshVerifiedUser = jwt.verify(refreshToken, `${APP_SECRET}`);
        } catch (refreshError: any) {
          return response.status(401).json({
            status: 'error',
            message: 'Refresh Token Expired. Please log in again.',
          });
        }

        const filter = { _id: refreshVerifiedUser.id };

        const projection = { refreshToken: 1, isBlacklisted: 1 };

        const userDetails:any = await userDatabase.userDatabaseHelper.getOne(filter, projection)

        if(userDetails.isBlacklisted){
            return response.status(403).json({
              status: 'error',
              message: `Account Blocked, contact admin on info@naijamade.com`
            })
        }

        const compareRefreshTokens = refreshToken === userDetails.refreshToken

        if(compareRefreshTokens === false){
          return response.status(401).json({
            status: 'error',
            message: 'Please log in again.',
          });
        }

        const tokenPayload = {
          id: refreshVerifiedUser.id,
          email: refreshVerifiedUser.email,
          role: refreshVerifiedUser.role
        };

        const newAccessToken = await generalHelpers.generateTokens(tokenPayload, '2h')

        const newRefreshToken = await generalHelpers.generateTokens(tokenPayload, '30d')

        response.setHeader('x-access-token', newAccessToken);

        response.setHeader('x-refresh-token', newRefreshToken)

        await userDatabase.userDatabaseHelper.updateOne(
          { _id: refreshVerifiedUser.id },
          { refreshToken }
        )

        request.user = refreshVerifiedUser;

        return next();
      }

      return response.status(401).json({
        status: 'error',
        message: `Login Again, Invalid Token: ${error.message}`,
      });
    }

    const filter = { _id: verifiedUser.id };

    const projection = { isBlacklisted: 1 };

    const userDetails:any = await userDatabase.userDatabaseHelper.getOne(filter, projection)

    if(userDetails.isBlacklisted){
        return response.status(403).json({
          status: 'error',
          message: `Account Blocked, contact admin on info@naijamade.com`
        })
    }

      request.user = verifiedUser;

      return next();

  } catch (error: any) {
    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error: ${error.message}`,
    });
  }
};


export function rolePermit(roles: string[]) {
  return async (request: JwtPayload, response: Response, next: NextFunction): Promise<any> => {
   
    const userRole = request.user.role
    const userId = request.user.id
    if (!userRole || !userId) {
      return response.status(401).json({
        status: 'error',
        message: 'User Not Authorized. Please login again',
      });
    }

    const isAuthorized = roles.includes(userRole);

    if (!isAuthorized) {
      return response.status(401).json({
        status: 'error',
        message: 'User Not Permitted For Action',
      });
    }

    next();
  };
}

