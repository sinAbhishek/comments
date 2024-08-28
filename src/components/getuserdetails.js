import { getAuth } from "firebase/auth";
export const getuserdetails = (uid) => {
  const record = "";
  getAuth()
    .getUser(uid)
    .then((userRecord) => {
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      record = userRecord;
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
  return record;
};
