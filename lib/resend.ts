import { Resend } from 'resend'

let resendClient: Resend | null = null

export function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY
    if (!key) {
      console.warn('Warning: RESEND_API_KEY is not defined. Emails will not be sent.')
      // Initialize with a dummy key or return a mock to prevent critical crashes
      resendClient = new Resend('re_mock_key_for_safety')
    } else {
      resendClient = new Resend(key)
    }
  }
  return resendClient;
}
