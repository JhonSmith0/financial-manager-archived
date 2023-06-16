import * as y from "yup";
import newTransactionSchema from "./newTransactionSchema";

const updateTransactionSchema = newTransactionSchema.shape({});

export default updateTransactionSchema;

