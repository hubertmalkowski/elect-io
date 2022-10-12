import app from "../FirebaseInit";
import { getFirestore, getDocs, collection} from "firebase/firestore";
import type { Poll } from "@/types/poll";
import type { Option } from "@/types/option";

export async function getOptionsFromPoll(pollID: string) {
    const db = getFirestore(app)
    console.log(pollID);
    
    let options: Array<Option> = []

    const querySnapshot = await getDocs(collection(db, "polls/"+pollID+"/options"))
    

    querySnapshot.forEach((doc) => {
        let data = doc.data()
        
        let tempOption: Option = {
            name: data.name,
            id: doc.id
        }
  
        // push Poll into Poll array
        options.push(tempOption)
      })

    return options
}