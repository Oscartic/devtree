import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateJWT = (payload : JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '180d' });
  return token;
};

export const verifyJWT = (token: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};