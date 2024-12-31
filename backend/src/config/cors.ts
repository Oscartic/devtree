import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [process.env.FRONTEND_URL];
    if(process.argv.includes('--api')) {
      allowedOrigins.push(undefined);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};