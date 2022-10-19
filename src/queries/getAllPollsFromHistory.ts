import app from "../FirebaseInit";
import { getDocs, collection, getFirestore, query, where, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { Poll } from "@/types/poll";
import { getPollHistory } from "./getPollHistory";



export async function getAllPollsFromHistory() {
    const db = getFirestore(app)
    const auth = getAuth(app)
    const pollsRef = collection(db, "polls")
    const q = query(pollsRef, where("history", "array-contains", auth.currentUser?.uid), orderBy("date", "desc"))
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

      polls.push(tempPoll) 
    })

  return polls;
}