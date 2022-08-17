export const API_KEY = {
  CALL_MORALIS: process.env.REACT_APP_CALL_MORALIS_API_KEY || ''
};

export const SOLONA_TOKEN = {
  API_URL:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json'
};

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGNING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || ''
};


export const AWS_S3_CONFIG = {
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || '',
  secretAccessKey:
    process.env.REACT_APP_SECRET_ACCESS_KEY || ''
};

export const ENV: 'dev' | 'test' = 'dev';
