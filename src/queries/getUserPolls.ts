import app from "../FirebaseInit";
import { getDocs, collection, getFirestore, where, query, getDoc } from "firebase/firestore";
import type { Poll } from "@/types/poll";

export async function getUserPolls(userUID: string) {
    const db = getFirestore(app)

    const q = query(collection(db, "polls"), where("creatorUID", "==", userUID))
    const querySnapshot = await getDocs(q)

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

    // push Poll into Poll array
    console.log(tempPoll);
    
    polls.push(tempPoll)
  })

  return polls;
}