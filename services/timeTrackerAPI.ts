import type { TimeLog } from '../types.ts';

// Use our proxy API endpoint to avoid CORS issues
const API_ENDPOINT = '/api/submit-time-log';

/**
 * Submits a time log via our proxy API endpoint.
 * @param log The time log data to submit.
 * @returns A promise that resolves with the result of the submission.
 */
export const submitTimeLog = async (log: TimeLog): Promise<{ success: boolean; message: string }> => {
  console.log('Submitting to API:', JSON.stringify(log, null, 2));

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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