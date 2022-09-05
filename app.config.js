import dotenv from "dotenv";
import { merge } from "lodash";

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDERID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_DATABASE_URL,
  AUTH_APP_ID,
  AUTH_APP_SECRET,
  AUTH_DISCOVERY_URL,
  BACKEND_BASE_URL,
} = process.env;

/**
 * @param {*} param.config is the app.json static loaded config
 * @returns
 */
module.exports = ({ config }) => {
  dotenv.config({ path: ".env" });

  return merge(config, {
    extra: {
      env: {
        FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDERID,
        FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID,
        FIREBASE_DATABASE_URL,
        AUTH_APP_ID,
        AUTH_APP_SECRET,
        AUTH_DISCOVERY_URL,
        BACKEND_BASE_URL,
      },
    },
  });
};
