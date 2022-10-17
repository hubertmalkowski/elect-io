import app from "../FirebaseInit";
import { getFirestore, getDocs, collection, query, orderBy} from "firebase/firestore";
import type { Poll } from "@/types/poll";
import type { Option } from "@/types/option";

export async function getOptionsValuesFromPoll(pollID: string) {
    const db = getFirestore(app)
    // console.log(pollID);
    
    let options: Array<{name: string, value: number}> = []
    //collection(db, "polls/"+pollID+"/options")
    const q = query(collection(db, "polls/"+pollID+"/options"), orderBy("order"))
    const querySnapshot = await getDocs(q)
    

    querySnapshot.forEach((doc) => {
        let data = doc.data()
        
        let tempOption: {name: string, value: number} = {
            name: data.name,
            value: data.value
        }
  
        // push Poll into Poll array
        options.push(tempOption)
      })

    return options
}