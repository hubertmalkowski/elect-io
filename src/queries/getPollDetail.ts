import app from "../FirebaseInit";
import { getFirestore, doc, getDoc, } from "firebase/firestore";
import type { Poll } from "@/types/poll";

export async function getPollDetail(pollID: string) {
    const db = getFirestore(app)
    // console.log(pollID);
    
    let poll: Poll

    const docRef = doc(db, "polls", pollID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        let data = docSnap.data()
        poll = {
            pollID: pollID,
            name: data.name,
            creator: data.creator,
            creatorUID: data.creatorUID,
            description: data.description,
            expirationDate: data.expirationDate,
            type: data.type,
            active: data.active,
            image: data.image
        }
    } else{
        console.log("Document retrievement failed");
        
        return null
    }

  return poll
}