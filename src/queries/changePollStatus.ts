import app from "../FirebaseInit";
import { getFirestore, doc, updateDoc, increment, arrayUnion, getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export async function changePolStatus(status: boolean, pollID: string) {
    const db = getFirestore(app)
    const auth = getAuth(app)

    if (auth.currentUser == null) {
        return
    }

    const pollRef = doc(db, "/polls", pollID)

    updateDoc(pollRef, {
        active: status
    })
}