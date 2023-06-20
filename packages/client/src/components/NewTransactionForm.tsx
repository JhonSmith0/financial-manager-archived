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
        padding-block: 0.6rem;
        align-self: end;
    }
`

interface Props {
    form: UseFormReturn<TransactionCreate>
    accounts: IAccount[]
    attrs?: FormHTMLAttributes<any>
}

export function NewTransactionForm({ accounts, form, attrs }: Props) {
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
                    {accounts.map((obj) => (
                        <option key={obj.id} value={obj.id}>
                            {obj.name}
                        </option>
                    ))}
                </select>
            </FieldSet>
            <FieldSet>
                <Label>To Account</Label>
                <select {...register("toAccountId")}>
                    {accounts.map((obj) => (
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
