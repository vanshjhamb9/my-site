import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentialsFromReplit() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected via Replit');
  }
  
  return {
    apiKey: connectionSettings.settings.api_key, 
    fromEmail: connectionSettings.settings.from_email
  };
}

async function getCredentialsFromEnv() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey) {
    throw new Error('RESEND_API_KEY not found in environment variables');
  }

  return { apiKey, fromEmail };
}

async function getCredentials() {
  // Try Replit Connectors first
  if (process.env.REPLIT_CONNECTORS_HOSTNAME) {
    try {
      return await getCredentialsFromReplit();
    } catch (error) {
      console.warn('Replit Connectors not available, falling back to environment variables');
    }
  }

  // Fallback to environment variables
  return await getCredentialsFromEnv();
}

export async function getUncachableResendClient() {
  const credentials = await getCredentials();
  return {
    client: new Resend(credentials.apiKey),
    fromEmail: credentials.fromEmail
  };
}