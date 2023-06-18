import { Title } from "@/components/styled/Title"
import { Form } from "@/components/styled/Form"
import { FieldSet } from "@/components/styled/FieldSet"
import { Label } from "@/components/styled/Label"
import { Input } from "@/components/styled/Input"
import { Button } from "@/components/styled/Button"
import { Bar } from "@/components/styled/Bar"
import { SCard } from "@/components/styled/Card"
import { IconList } from "@/components/styled/IconList"
import styled from "styled-components"
import { VscClose } from "react-icons/vsc"
import Draggable from "react-draggable"
import { IAccount } from "@/interface"
import { useHookstate } from "@hookstate/core"

export const StyledUpdateAccountCard = styled(SCard)`
    position: absolute;
    width: max-content;
    max-width: 30rem;

    ${Bar} {
        button {
            height: max-content;
        }
    }

    .buttons {
        margin-block: 2.4rem;
        display: flex;
        gap: 0.9rem;
    }
`

interface Props {
    onClose(): any
    onSave(data: IAccount): any
    data: IAccount
}

export function UpdateAccountCard(props: Props) {
    const state = useHookstate<IAccount>({ ...props.data })
    const values = state.get()

    return (
        <Draggable handle=".header">
            <StyledUpdateAccountCard>
                <Bar as={"header"} className="header">
                    <Title size="small">{values.name}</Title>
                    <IconList>
                        <button onClick={props.onClose}>
                            <VscClose />
                        </button>
                    </IconList>
                </Bar>
                <div className="content">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault()
                            props.onSave(values)
                        }}
                    >
                        <FieldSet>
                            <Label>Name</Label>
                            <Input
                                value={values.name}
                                onChange={(e) => state.name.set(e.target.value)}
                            />
                        </FieldSet>
                        <FieldSet>
                            <Label>Description</Label>
                            <Input
                                value={values.description}
                                onChange={(e) =>
                                    state.description.set(e.target.value)
                                }
                            />
                        </FieldSet>
                        <div className="buttons">
                            <Button>Salvar</Button>
                            <Button onClick={props.onClose}>Cancelar</Button>
                        </div>
                    </Form>
                </div>
            </StyledUpdateAccountCard>
        </Draggable>
    )
}
