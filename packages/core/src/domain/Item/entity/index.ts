import { Transformer } from "@/common/Transformer"

export class Item {
    public id: string
    public name: string
    public price: number
    public amount: number
    public transactionId: string

    constructor(data: ItemProps) {
        Transformer.assignPlainToInstance(Item, data, this)
    }
}

export interface ItemProps extends ClassProperties<Item> {}
