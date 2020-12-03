// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from './api/config';

// Export to work with Firebase arrays
export const FieldValue = app.firestore.FieldValue;
// Export app
export default app.initializeApp(config);
