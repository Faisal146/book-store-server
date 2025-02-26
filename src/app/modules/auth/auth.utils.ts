import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
  role: string;
}

export const createToken = (
  jwtPayload: JwtPayload,
  secret: any,
  expiresIn: any,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
