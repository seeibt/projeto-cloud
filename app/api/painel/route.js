import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import { Tools, User } from "@/models/tools";

export async function GET(){
   
    await connectDB();

    return NextResponse.json("Sim, ta funcionando!", {status: 200});
}

export async function POST(req) {
    await connectDB();

    const body = await req.json();
    const posicao = body.posicao;
    const codigo = body.codigo;

    console.log('Posição:', posicao);
    console.log('Código:', codigo);

    const tool = await Tools.findOne({ posicao: posicao });
    
    const user = await User.findOne({ codigo: codigo });

    console.log("Ferramenta: ", tool);
    console.log("Usuario: ", user);

    return NextResponse.text('Requisição POST recebida com sucesso', { status: 200 });
}