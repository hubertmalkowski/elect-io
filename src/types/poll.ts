import type {Option} from "@/types/option";

export interface Poll {

    name: string,
    creator: string,

    description: string,

    options: Array<Option>,

    expirationDate: Date,

    //typy bedzie trzeba jeszcze przedyskutować jakie mają być dostępne. Na razie róbmy wszystko typu "basic"
    type: string,
    active: boolean
}