import DTO from "@/common/DTO/DTO"
import { ItemProps } from "../entity"
import { ItemId } from "../validators"

export class DeleteItemDTO extends DTO implements Pick<ItemProps, "id"> {
    @ItemId()
    public id: string
    constructor(data: ClassProperties<DeleteItemDTO>) {
        super()
        Object.assign(this, data)
    }
}
