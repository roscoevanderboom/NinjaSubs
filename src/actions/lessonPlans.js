import { storageRef } from "constants/firebase/storage";
import setLoading from "actions/loading";
import { handleProfileDataArrays } from "actions/user";

export const addFileToStorage = (user, file, dispatch, feedback) => {
  setLoading(dispatch, true);
  var ref = storageRef.child(`/lessonPlans/${user.uid}/${file.name}`);

  ref
    .put(file.data)
    .then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          let data = { name: file.name, url: url };
          handleProfileDataArrays(user, "arrayUnion", "lessonPlans", data);
          setLoading(dispatch, false);
        })
        .catch((err) => setLoading(dispatch, false));
    })
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
      feedback("error", err.message);
      setLoading(dispatch, false);
    });
};

export const deleteFileFromStorage = (user, file) => {
  var ref = storageRef.child(`/lessonPlans/${user.uid}/${file.name}`);
  ref
    .delete()
    .then(() =>
      handleProfileDataArrays(user, "arrayRemove", "lessonPlans", file)
    )
    .catch((err) => console.log(err));
};

export const fileValidation = (file, feedback, setError) => {
  if (file.size > 2097152) {
    feedback(
      "error",
      "File is too big. Please upload a file smaller than 2MB."
    );
    setError(true);
  } else {
    setError(false);
  }
};

export const deleteAllItems = (user) => {
  var ref = storageRef.child(`/lessonPlans/${user.uid}`);
  ref
    .listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        var childRef = storageRef.child(
          `/lessonPlans/${user.uid}/${itemRef.name}`
        );
        childRef.delete()
        .then(() => console.log(itemRef.name + " deleted"))
      });
    })
    .then(() => console.log("lesson plans deleted"))
    .catch((error) => console.log(error));
};

export const listStorageItems = (user) => {
  var ref = storageRef.child(`/lessonPlans/${user.uid}`);
  ref
    .listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        console.log(itemRef.name);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};
