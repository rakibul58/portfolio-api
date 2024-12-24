import { NextFunction, Request, Response } from 'express';

type TUserRole = 'admin';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    // checking if the token is sent invalid way
    if (!token.startsWith('Bearer ')) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Token is not sent in correct way!',
      );
    }

    const spiltToken = token.split(' ');
    const accessToken = spiltToken[1];

    // checking if the given token is valid
    let decoded;
    try {
      // checking if the given token is valid
      decoded = jwt.verify(
        accessToken,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const { role, user } = decoded;

    if (!(user === config.default_user)) {
      throw new AppError(httpStatus.NOT_FOUND, 'Wrong Username!');
    }

    // checking the role is correct
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
