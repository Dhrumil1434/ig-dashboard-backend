// utils/instagram.util.ts
import { IgApiClient } from 'instagram-private-api';
import * as fs from 'fs/promises';
import * as path from 'path';

const ig = new IgApiClient();
const SESSION_PATH = path.join(__dirname, '../../insta-session.json');

export const loginInstagram = async (): Promise<IgApiClient> => {
  const username = process.env['INSTA_USERNAME']!;
  const password = process.env['INSTA_PASSWORD']!;
  ig.state.generateDevice(username);

  try {
    const session = await loadSession();
    if (session) {
      await ig.state.deserialize(session);
      console.log('🔐 Session restored!');
    } else {
      await ig.account.login(username, password);
      console.log('✅ Logged into Instagram!');
      await saveSession();
    }
  } catch (err) {
    console.error('❌ Instagram login failed:', err);
  }

  return ig; // <-- RETURN IG INSTANCE
};

const saveSession = async () => {
  const session = await ig.state.serialize();
  delete session.constants;
  await fs.writeFile(SESSION_PATH, JSON.stringify(session, null, 2));
};

const loadSession = async () => {
  try {
    const sessionData = await fs.readFile(SESSION_PATH, 'utf-8');
    return JSON.parse(sessionData);
  } catch {
    return null;
  }
};
