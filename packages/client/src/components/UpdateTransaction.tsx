import { ITransaction } from "@/interface";
import styled from "styled-components";
import { Card } from "./Card";
import {
    StyledCard,
    StyledFieldSet,
    StyledForm,
    StyledInput,
    StyledLabel,
} from "./styled";

interface Props {
    transaction: ITransaction;
    onClose(): any;
}

export const StyledUpdateTransaction = styled(StyledCard)`
    ${StyledInput} {
        width: 100%;
    }
    ${StyledFieldSet} {
        margin-bottom: 1.8rem;
    }
`;

export function UpdateTransaction(data: Props) {
    const transaction = { ...data.transaction };

    return (
        <StyledUpdateTransaction>
            <Card title="Update Transaction" onClose={data.onClose}>
                <StyledForm>
                    <StyledFieldSet>
                        <StyledLabel>Id</StyledLabel>
                        <StyledInput disabled value={transaction.id} />
                    </StyledFieldSet>
                </StyledForm>
            </Card>
        </StyledUpdateTransaction>
    );
}
