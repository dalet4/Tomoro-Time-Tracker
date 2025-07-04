import type { TimeLog } from '../types.ts';

// This is your live Airtable webhook URL.
const AIRTABLE_WEBHOOK_URL = 'https://hooks.airtable.com/workflows/v1/genericWebhook/appDbaPMgEw6RIb3b/wflNqznG9IapoCGzf/wtrtK1GUpTvv4Fg9a';

/**
 * Submits a time log to the live Airtable webhook.
 * @param log The time log data to submit.
 * @returns A promise that resolves with the result of the submission.
 */
export const submitTimeLog = async (log: TimeLog): Promise<{ success: boolean; message: string }> => {
  console.log('Submitting to Airtable Webhook:', JSON.stringify(log, null, 2));

  try {
    const response = await fetch(AIRTABLE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Airtable's "When webhook received" trigger expects the JSON payload directly.
      body: JSON.stringify(log), 
    });

    if (!response.ok) {
      const errorBody = await response.text();
      // Provide a more detailed error message for easier debugging.
      throw new Error(`API Error ${response.status}: ${response.statusText}. Details: ${errorBody}`);
    }

    // The component formats the final success message. This confirms the API call was successful.
    return { success: true, message: 'Submission successful.' };
  } catch (error) {
    console.error('Failed to submit time log:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: `Submission failed: ${errorMessage}` };
  }
};