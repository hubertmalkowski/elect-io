import app from "../FirebaseInit";
import { getDocs, collection, getFirestore, query, where, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { Poll } from "@/types/poll";
import { getPollHistory } from "./getPollHistory";



export async function getAllPolls() {
    const db = getFirestore(app)
    const auth = getAuth(app)
    const pollsRef = collection(db, "polls")
    const q = query(pollsRef, where("active", "==", true), orderBy("date", "desc"))
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

      //if user already saw ignore and do not push
      if (doc.data().history && auth.currentUser && doc.data().history.includes(auth.currentUser.uid)) return

      polls.push(tempPoll) 
    })

  return polls;
}