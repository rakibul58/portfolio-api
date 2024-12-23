import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import config from '../../config';
import { createToken, verifyToken } from './auth.utils';
import { USER_ROLE } from '../User/user.constant';

const signInUserFromDB = async (payload: {
  user: string;
  password: string;
}) => {
  if (!(payload?.user === config.default_user)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wrong Username!');
  }

  if (!(payload?.password === config.default_password))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = {
    user: payload.user,
    role: USER_ROLE.admin,
  };

  // creating token
  const accessToken = createToken(
    jwtPayload as { role: string; user: string },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload as { role: string; user: string },
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { user } = decoded;

  if (!(user?.user === config.default_user)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wrong Username!');
  }

  const jwtPayload = {
    user: user.user,
    role: USER_ROLE.admin,
  };

  const accessToken = createToken(
    jwtPayload as { role: string; user: string },
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
