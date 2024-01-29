import { storage } from "../constants/Profile";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
async function uploadImage(uri, fileType) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(
          `Network request failed with status ${response.status}`
        );
      }
      const blob = await response.blob();
      const storageRef = ref(storage, "Stuff/" + new Date().getTime());
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          resolve({ downloadURL, fileType });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
async function saveRecord(fileType, url, createdAt) {
  try {
    const docRef = {
      fileType,
      url,
      createdAt,
    };
  } catch (e) {
    console.log(e);
  }
}
const tasks = { uploadImage };
export default tasks;
