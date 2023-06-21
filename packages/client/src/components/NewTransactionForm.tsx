import { Button } from "@/components/styled/Button"
import { FieldSet } from "@/components/styled/FieldSet"
import { Form } from "@/components/styled/Form"
import { Input } from "@/components/styled/Input"
import { Label } from "@/components/styled/Label"
import { IAccount, TransactionCreate } from "@/interface"
import { FormHTMLAttributes } from "react"
import { UseFormReturn } from "react-hook-form"
import styled from "styled-components"

export const StyledNewTransactionForm = styled(Form)`
    ${Form} {
        gap: 4rem;
    }

    ${Button} {
        padding: 0.9rem 2rem;
        align-self: end;
        margin-block: 0;
    }
`

interface Props {
    form: UseFormReturn<TransactionCreate>
    attrs?: FormHTMLAttributes<any>
    fromAccount: IAccount[]
    toAccount: IAccount[]
}

export function NewTransactionForm({ form, attrs, ...props }: Props) {
    const { register } = form

    return (
        <StyledNewTransactionForm direction="row" {...attrs}>
            <FieldSet>
                <Label>Date</Label>
                <Input
                    type="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    {...register("date", { valueAsDate: true })}
                />
            </FieldSet>
            <FieldSet>
                <Label>Amount</Label>
                <Input
                    type="number"
                    {...register("amount", { valueAsNumber: true })}
                />
            </FieldSet>
            <FieldSet>
                <Label>Description</Label>
                <Input type="text" {...register("description")} />
            </FieldSet>
            <FieldSet>
                <Label>From Account</Label>
                <select {...register("fromAccountId")}>
                    {props.fromAccount.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                            {obj.name}
                        </option>
                    ))}
                </select>
            </FieldSet>
            <FieldSet>
                <Label>To Account</Label>
                <select {...register("toAccountId")}>
                    {props.toAccount.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                            {obj.name}
                        </option>
                    ))}
                </select>
            </FieldSet>
            <Button type="submit">Send</Button>
        </StyledNewTransactionForm>
    )
}
