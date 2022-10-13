// @TODO
// get Poll history
// return it

import app from "../FirebaseInit"
import { getFirestore, doc, getDoc } from "firebase/firestore"

export function getPollHistory(pollID: string) {
    const db = getFirestore(app)
    let history: Array<string> = []

    const pollRef = doc(db, "/polls/"+pollID)

    getDoc(pollRef).then((poll) => {
        if (poll.exists() && poll.data() != undefined) {
            if (poll.data().history) {
                history = poll.data().history

                console.log(history)
                return history
            }
        }
    })

    return false
}