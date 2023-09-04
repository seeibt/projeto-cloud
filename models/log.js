import mongoose, { Schema } from "mongoose";

const logSchema = new Schema(
    {
        tipo: String,
        dataOperacao: String,
        ferramenta: String,
        tipoOperacao: String,
        usuario: String
    }
);

const Log = mongoose.models.Log || mongoose.model("Log", logSchema);

export default Log;