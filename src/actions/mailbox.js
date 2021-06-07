import { mailbox } from "../constants/firebase/collections";

export const sendMail = (formData, feedback, setFormData, init) => {
  mailbox
    .doc()
    .set(formData)
    .then(() => {
      feedback("success", "Your mail has been sent!");
      setFormData(init);
    })
    .catch((err) => feedback("error", err.message));
};
