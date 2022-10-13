import app from "../FirebaseInit";
import { getFirestore, doc, updateDoc, increment, arrayUnion, getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export async function addValueToOption(optionID: string, pollID: string, value: number) {
    const db = getFirestore(app)
    const auth = getAuth(app)

    if (auth.currentUser == null) {
        return
    }

    const optionRef = doc(db, "/polls/"+ pollID +"/options", optionID)
    const pollRef = doc(db, "/polls", pollID)
    
    getDoc(pollRef).then(async (poll) => {
        if (poll.data() != undefined){
            const history : Array<string> = poll.data()!.history

            if (history.includes(auth.currentUser!.uid)) {
                // console.log("chłop już jest w historii");
                return
            }
            else {
                // console.log("można na luzie głosować");
                await updateDoc(optionRef, {
                    value: increment(value)
                })

                await updateDoc(pollRef, {
                    history: arrayUnion(auth.currentUser!.uid)
                })
            }
    }
    })
    
    
}