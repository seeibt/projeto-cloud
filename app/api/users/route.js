import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import User from "@/models/user";

export async function POST(req){
    const { nome, funcao, codigo } = await req.json();
    const data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    await connectDB();
    const existingUser = await User.findOne({ codigo });

    if (existingUser) {
        return NextResponse.json({message: "Usuário não foi criado pois já existe um com esse código!"}, {status: 404});
    } else {
        await User.create({ nome, funcao, codigo, data });
        return NextResponse.json({message: "Usuário criado com sucesso!"}, {status: 201});
    }    
}

export async function GET(){
   
    await connectDB();

    const users = await User.find({});

    return NextResponse.json(users, {status: 200});
}

export async function DELETE(req){
    const id = req.nextUrl.searchParams.get("id");

    await connectDB();

    await User.findByIdAndDelete(id);

    if(!id) return NextResponse.json({message: "Usuário não encontrado!"}, {status: 404});
    return NextResponse.json({message: "Usuário deletado com sucesso!"}, {status: 200});
    
}

