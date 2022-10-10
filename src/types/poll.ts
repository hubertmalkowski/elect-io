import type {Option} from "@/types/option";

export interface Poll {
    name: string,
    creator: string,
    description: string,
    options: Array<Option>,
    expirationDate: Date,
    type: string,
    active: boolean
}