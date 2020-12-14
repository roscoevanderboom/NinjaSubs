import { storageRef } from "../constants/firebase/storage";
import { handleProfileData } from "./user";
import setLoading from "./loading";

export const selectImage = (e, setUrl, setNewFile) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setUrl(url);
    setNewFile(e.target.files[0]);
}

export const upLoadFile = (user, file, dispatch, feedback) => {
    setLoading(dispatch, true);
    var imagesRef = storageRef.child(`${user.uid}/avatarImg/${file.name}`);

    imagesRef.put(file)
        .then(async function (snapshot) {
            let url = await snapshot.ref.getDownloadURL()
            await handleProfileData({ action: 'update', user, data: { image: url } })
            setLoading(dispatch, false)
        })
        .catch(error => {
            feedback('error', error.message);
            setLoading(dispatch, false);
        })
}