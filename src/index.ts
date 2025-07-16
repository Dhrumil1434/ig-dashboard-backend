import dotenv from 'dotenv';
import app from './app';
import { validateEnv } from '@utils-core';
import connectDB from 'db';
import { loginInstagram } from 'utils/instagram.util';
import { sendDM } from 'utils/sendDm.util';
import { uploadPost } from 'utils/uploadPost.util';
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
    await uploadPost(ig, '../ig-backend/public/image.png', 'great click');
    await sendDM(ig, 'dhrumil._.panchal', 'Hello');
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed!', err);
  });
