// General
const validateProfileName = (data) => data.name !== "";
const validateUser = (user) => user === null;
const validateUserEmail = (user) => user.emailVerified;
// Sub
const validateLocations = (data) => data.locations.length !== 0;
// Employer
const validateDistrict = (data) => data.location !== "";
const validateContact = (data) => data.contact !== "";

export {
  validateContact,
  validateUserEmail,
  validateUser,
  validateProfileName,
  validateLocations,
  validateDistrict,
};
