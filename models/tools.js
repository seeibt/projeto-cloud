import mongoose, { Schema } from "mongoose";

const toolsSchema = new Schema(
    {
        nome: String, 
        posicao: String,
        dataOperacao: String,
        tipoOperacao: String
    }
);

const Tools = mongoose.models.Tools || mongoose.model("Tools", toolsSchema);

export default Tools;