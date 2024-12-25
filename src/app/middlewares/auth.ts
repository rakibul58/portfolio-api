import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    if (!token.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token format!');
    }

    const accessToken = token.split(' ')[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(
        accessToken,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token!');
    }

    // Check if user still exists
    const user = await User.findOne({ user: decoded.user });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    // Check role
    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You do not have permission to perform this action',
      );
    }

    // Add user to request object
    req.user = decoded;
    next();
  });
};

export default auth;
