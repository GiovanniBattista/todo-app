import { firebaseConfig } from "./firebase.config";

export const environment = {
  firebase: firebaseConfig.prod,
  production: true,
  api: '',
};
