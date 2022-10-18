import app from "../FirebaseInit";

import { getFirestore, collection, setDoc, doc, addDoc } from "firebase/firestore";
// import {  } from "firebase/storage";

import type { Option } from "@/types/option";

/*
createNewPoll("test", user.displayName, user.uid, "opis", "brak").then(() => {
    console.log("jej jest!")
  }
)
*/
export async function createNewPoll(name: string, creator: string, creatorUID: string, description: string, type: string, options: Array<string>) {
    const db = getFirestore(app)
    
    const pollData = {
        name: name,
        creator: creator,
        creatorUID: creatorUID,
        description: description,
        type: type,
        history: [],
        image: "",
        active: true
    }

    const newPoll = await addDoc(collection(db, "polls"), pollData)
    
    // options.forEach(async option => {
    //     const data = {
    //         name: option,
    //         value: 0
    //     }

    //     await addDoc(collection(db, newPoll.id), data)
    // });
    const collRef = collection(db, "polls/" + newPoll.id + "/options")
    console.log(collRef);
    options.forEach(async (option, index) => {
        await addDoc(collRef, {
            name: option,
            order: index,
            value: 0
        })
    })

    return newPoll
}
