import type {Option} from "@/types/option";

export interface Poll {
    pollID: string,
    name: string,
    creator: string,
    creatorUID: string,

    image: string,
    description: string,
    expirationDate: Date,

    //typy bedzie trzeba jeszcze przedyskutować jakie mają być dostępne. Na razie róbmy wszystko typu "basic"
    type: string,
    active: boolean
}