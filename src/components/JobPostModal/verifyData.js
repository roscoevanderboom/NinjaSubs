import moment from "moment";
import { noUserImage, add_if_not_included } from "../../constants";
import FEEDBACK from "constants/feedback";

export const verifyData = (post) => {
  let errors = [];
  let result = true;
  if (
    post.location === "" ||
    post.contact === "" ||
    post.address === "" ||
    post.image === noUserImage ||
    post.phone === ""
  ) {
    let txt = "Complete user profile";
    add_if_not_included(errors, txt);
  }
  if (
    post.start === "" ||
    post.end === "" ||
    moment(post.end).isBefore(post.start)
  ) {
    let txt = "Specify dates correctly";
    add_if_not_included(errors, txt);
  }
  if (post.rates === "") {
    let txt = "Specify hourly rates";
    add_if_not_included(errors, txt);
  }
  if (post.comments === "") {
    let txt = "Add some details about the job";
    add_if_not_included(errors, txt);
  }

  return { result, errors };
};

export const checkDate = (post, key, userDate, feedback) => {
  let res;
  switch (key) {
    case "start":
      res = moment(userDate).isSameOrAfter(moment(), "day");
      if (!res) {
        feedback(
          FEEDBACK.TYPE.ERROR,
          FEEDBACK.MESSAGE.DATE_IS_EARLIER_THAN_CURRENT_DATE
        );
      }
      break;
    default:
      res = moment(userDate).isSameOrAfter(post.start);
      if (!res) {
        feedback(
          FEEDBACK.TYPE.ERROR,
          FEEDBACK.MESSAGE.SELECT_A_DATE_LATER_THAN_THE_START_DATE
        );
      }
      break;
  }
  return res;
};
