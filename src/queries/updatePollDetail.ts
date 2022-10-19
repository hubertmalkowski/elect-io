import app from "../FirebaseInit";

import { getFirestore, collection, setDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL, ref as fref } from "firebase/storage";

import type { Option } from "@/types/option";
import { getPollDetail } from "./getPollDetail";
import { getPollHistory } from "./getPollHistory";
import { getOptionsFromPoll } from "./getOptionsFromPoll";

/*
createNewPoll("test", user.displayName, user.uid, "opis", "brak").then(() => {
    console.log("jej jest!")
  }
)
*/
export async function updatePollDetail(name: string, description: string, type: string, image: File, newOptions: Array<string>, pollID: string) {
    const db = getFirestore(app)
    const storage = getStorage(app)
    const auth = getAuth(app)
    
    const oldPoll = await getPollDetail(pollID)
    const oldHistory = await getPollHistory(pollID)
    const oldOptions = await getOptionsFromPoll(pollID)
    
    let imgURL
    if (image){
        const storageRef = fref(storage, new Date().getTime().toString() + auth.currentUser!.uid)
        const snapshot = await uploadBytes(storageRef, image)
        imgURL = await getDownloadURL(snapshot.ref)
    }

    if (!imgURL){
        imgURL = typeof(oldPoll?.image) == "string" ? oldPoll.image : ""
    }

    const pollData = {
        name: name,
        creator: oldPoll?.creator != auth.currentUser?.displayName ? auth.currentUser?.displayName : oldPoll?.creator,
        creatorUID: oldPoll?.creatorUID,
        description: description,
        type: type,
        history: oldHistory,
        image: imgURL,
        active: oldPoll?.active
    }
    console.log(pollData);
    
    const pollRef = doc(db, "polls/" + pollID)
    await setDoc(pollRef, pollData)

    if(newOptions.length < 1) {
        return
    }
    const optsRef = collection(db, "polls/" + pollID + "/options")

    newOptions.forEach(async (option, index) => {
        await addDoc(optsRef, {
            name: option,
            order: oldOptions.length -1 +index,
            value: 0
        })
    })
}
