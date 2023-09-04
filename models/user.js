import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
    {
        nome: String, 
        funcao: String,
        data: String,
        dataEditado: String,
        tipoOperacao: String,
        codigo: String
    }
);


const User = mongoose.models.User || mongoose.model("User", usersSchema);

export default User;