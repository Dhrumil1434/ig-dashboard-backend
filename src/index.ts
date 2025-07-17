import dotenv from 'dotenv';
import app from './app';
import { validateEnv } from '@utils-core';
import connectDB from 'db';
import { loginInstagram } from 'utils/instagram.util';
dotenv.config();
validateEnv([
  'PORT',
  'MONGO_URI',
  'ACCESS_TOKEN_SECRET',
  'REFRESH_TOKEN_SECRET',
  'NODE_ENV',
]);

const PORT = process.env['PORT'] || 3000;

connectDB()
  .then(async () => {
    const ig = await loginInstagram();
    console.log(await ig.music.genres('sad'));
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed!', err);
  });
