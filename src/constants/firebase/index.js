// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  
};

export const FieldValue = app.firestore.FieldValue;
export const firebase = app;

export default app.initializeApp(config);
