// utils/uploadPost.util.ts
import { IgApiClient } from 'instagram-private-api';
import * as fs from 'fs';
import * as path from 'path';

export const uploadPost = async (
  ig: IgApiClient,
  imagePath: string,
  caption: string
) => {
  try {
    const imageBuffer = fs.readFileSync(path.resolve(imagePath));

    const publishResult = await ig.publish.photo({
      file: imageBuffer,
      caption: caption,
    });

    console.log(`✅ Post uploaded! Media ID: ${publishResult.media.id}`);
  } catch (err) {
    console.error('❌ Failed to upload post:', err);
  }
};
