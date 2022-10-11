import app from "../FirebaseInit";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import type { Poll } from "@/types/poll";

export async function getAllPolls() {
    const db = getFirestore(app)

    const querySnapshot = await getDocs(collection(db, "polls"))
    let polls: Array<Poll> = []

    querySnapshot.forEach((doc) => {
    let data = doc.data()
    let tempPoll: Poll = {
      name: data.name,
      creator: data.creator,
      description: data.description,
      options: data.options,
      expirationDate: data.expirationDate,
      type: data.type,
      active: data.active
    }

    console.log(tempPoll);
    
    // push Poll into Poll array
    polls.push(tempPoll)  
  })

  return polls;
}