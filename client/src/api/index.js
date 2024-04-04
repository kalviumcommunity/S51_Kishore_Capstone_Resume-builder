import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const getUserDetail = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if (userCred) {
                const userData = userCred.providerData[0];
                console.log(userData); // Make sure to remove this future me :)
                const userDocRef = doc(db, "users", userData?.uid);
                const unsubscribeSnapshot = onSnapshot(userDocRef, (_doc) => {
                    if (_doc.exists()) {
                        resolve(_doc.data());
                    } else {
                        // If user document doesn't exist, create it with user data
                        setDoc(userDocRef, userData)
                            .then(() => resolve(userData))
                            .catch((error) => reject(error));
                    }
                });
                return () => unsubscribeSnapshot();
            } else {
                reject(new Error("User not authenticated"));
            }
        });
    });
};
