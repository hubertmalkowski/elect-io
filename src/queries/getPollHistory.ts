// @TODO
// get Poll history
// return it

import app from "../FirebaseInit"
import { getFirestore, doc, getDoc } from "firebase/firestore"

export async function getPollHistory(pollID: string) {
    const db = getFirestore(app)
    let history: Array<string> = []

    const pollRef = doc(db, "/polls/"+pollID)

     await getDoc(pollRef).then((poll) => {
        if (poll.exists() && poll.data() != undefined) {
            if (poll.data().history) {
                history = poll.data().history
            }
        }
    })

    return history


}