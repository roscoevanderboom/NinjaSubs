import FEEDBACK from "constants/feedback";
import {
  validateLocations,
  validateDistrict,
} from "../../constants/validation";

export default (profileData, feedback) => {
  switch (profileData.type) {
    case "Substitute":
      if (!validateLocations(profileData)) {
        feedback(
          FEEDBACK.TYPE.INFO,
          FEEDBACK.MESSAGE.PLEASE_ADD_A_FEW_DISTRICTS
        );
      }
      break;
    case "Employer":
      if (!validateDistrict(profileData)) {
        feedback(FEEDBACK.TYPE.INFO, FEEDBACK.MESSAGE.PLEASE_SELECT_A_DISTRICT);
      }
      break;
    default:
      break;
  }
};
