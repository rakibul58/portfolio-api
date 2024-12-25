import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import config from '../../config';
import { createToken, verifyToken } from './auth.utils';
import { User } from '../User/user.model';

const signInUserFromDB = async (payload: {
  user: string;
  password: string;
}) => {
  const user = await User.findOne({ user: payload.user }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Verify password
  const isPasswordMatched = await user.isPasswordMatched(payload.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  const jwtPayload = {
    user: user.user,
    role: user.role,
  };

  // creating token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      user: user.user,
      role: user.role,
    },
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const user = await User.findOne({ user: decoded.user });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const jwtPayload = {
    user: user.user,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  signInUserFromDB,
  refreshToken,
};
