import DTO from "@/common/DTO/DTO"
import { ItemProps } from "../entity"
import { ItemAmount, ItemName, ItemPrice } from "../validators"
import { TransactionId } from "@/domain/Transaction/validators"

export class CreateItemDTO extends DTO implements Omit<ItemProps, "id"> {
    @ItemName()
    public name: string

    @ItemPrice()
    public price: number

    @ItemAmount()
    public amount: number

    @TransactionId()
    public transactionId: string

    constructor(data: ClassProperties<CreateItemDTO>) {
        super()
        Object.assign(this, data)
    }
}
