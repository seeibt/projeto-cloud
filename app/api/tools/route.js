import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Tools from "@/models/tools";

export async function POST(req){
    const { nome, posicao} = await req.json();

    await connectDB();
    await Tools.create({ nome, posicao, dataOperacao: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) });

    return NextResponse.json({message: "Ferramenta criada com sucesso!"}, {status: 201});
}

export async function GET(){
   
    await connectDB();

    const tools = await Tools.find({});

    return NextResponse.json(tools, {status: 200});
}

export async function DELETE(req){
    const id = req.nextUrl.searchParams.get("id");

    await connectDB();

    await Tools.findByIdAndDelete(id);

    if(!id) return NextResponse.json({message: "Ferramenta não encontrada!"}, {status: 404});
    return NextResponse.json({message: "Ferramenta deletada com sucesso!"}, {status: 200});
    
}

