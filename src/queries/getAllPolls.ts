import app from "../FirebaseInit";
import { getDocs, collection, getFirestore, query, where } from "firebase/firestore";
import type { Poll } from "@/types/poll";



export async function getAllPolls() {
    const db = getFirestore(app)

    const q = query(collection(db, "polls"), where("active", "==", true))
    const querySnapshot = await getDocs(q)
    let polls: Array<Poll> = []

    querySnapshot.forEach((doc) => {
        let data = doc.data()
        let tempPoll: Poll = {
          pollID: doc.id,
          name: data.name,
          creator: data.creator,
          creatorUID: data.creatorUID,
          description: data.description,
          date: data.date,
          type: data.type,
          active: data.active,
          image: data.image
    }

    // push Poll into Poll array
    polls.push(tempPoll)
  })

  return polls;
}