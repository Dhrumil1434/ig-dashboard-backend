// utils/sendDM.ts
import { IgApiClient } from 'instagram-private-api';

export const sendDM = async (
  ig: IgApiClient,
  recipientUsername: string,
  message: string
) => {
  try {
    // Step 1: Get the user ID
    const userId = await ig.user.getIdByUsername(recipientUsername);

    // Step 2: Create or get a DM thread
    const thread = ig.entity.directThread(['' + userId]);

    // Step 3: Send the message
    await thread.broadcastText(message);
    console.log(`✉️ Message sent to ${recipientUsername}: ${message}`);
  } catch (err) {
    console.error(`❌ Failed to send DM to ${recipientUsername}:`, err);
  }
};
