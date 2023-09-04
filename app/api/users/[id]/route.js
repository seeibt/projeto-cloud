import connectDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import Swal from 'sweetalert2';

export async function PUT(req, {params}){
    const { id } = params;
    const { newNome: nome, newFuncao: funcao, newCodigo: codigo } = await req.json();

    const dataEditado = new Date().toLocaleString('pt-BR');

    await connectDB();

    const existingUser = await User.findOne({ codigo });

    if (!existingUser) {
        const user = await User.findByIdAndUpdate(id, { nome, funcao, codigo, dataEditado});

        if(!user) return NextResponse.json({message: "Usuário não encontrado!"}, {status: 404});
        return NextResponse.json(user, {status: 200});
    } else {
        return NextResponse.json({message: "Usuário não foi editado pois já existe um com esse código!"}, {status: 509});
    }
}

export async function GET(req, {params}){
    const { id } = params;
    
    await connectDB();
    const user = await User.findOne({ _id: id});

    return NextResponse.json({ user }, {status: 200});
}