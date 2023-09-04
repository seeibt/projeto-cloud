import connectDB from "@/libs/mongodb";
import Log from "@/models/log";
import Tools from "@/models/tools";
import User from "@/models/user";
import { NextResponse } from "next/server";


function registrarLog(tipo, ferramenta, tipoOperacao, dataOperacao, usuario) {

    const log = new Log({
      tipo: tipo,
      ferramenta: JSON.stringify(ferramenta), // Converter o objeto para string
      tipoOperacao: tipoOperacao,
      dataOperacao: dataOperacao,
      usuario: JSON.stringify(usuario),
    });
  
    log.save();
  }

export async function PUT(req, {params}){
    await connectDB();

    const { id } = params;
    const { newNome: nome, newPosicao: posicao, tipoOperacao: tipoOperacao, codigoUsuario: codigoUsuario} = await req.json();
    const dataOperacao = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const usuario = await User.findOne({codigo: codigoUsuario}); // Busca o usuário pelo código

    const tools = await Tools.findByIdAndUpdate(id, { nome, posicao, dataOperacao, tipoOperacao});

    if(!usuario) return NextResponse.json({message: "Usuário não encontrada!"}, {status: 404});
    if(!tools) return NextResponse.json({message: "Ferramenta não encontrada!"}, {status: 404});

    registrarLog('PUT', tools, tipoOperacao, dataOperacao, usuario);

    return NextResponse.json(tools, {status: 200});
}

export async function GET(req, {params}){
    const { id } = params;
    
    await connectDB();
    const tools = await Tools.findOne({ _id: id});

    return NextResponse.json({ tools }, {status: 200});
}