import { NextResponse } from 'next/server';
import connectDB from "../../../libs/mongodb";
import Tools from "@/models/tools";
import User from "@/models/user";
import Log from "@/models/log";

export async function GET(){
   
    await connectDB();

    return NextResponse.json("Sim, ta funcionando!", {status: 200});
}

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

export async function POST(req) {

    await connectDB();

    const body = await req.json();

    console.log('Posição:', body.posicao);
    console.log('Código:', body.codigo);

    const ferramenta = await Tools.findOne({posicao: body.posicao}); // Busca a ferramenta pela posição
    const id = ferramenta.id;
    const tipoOperacao = body.tipoOperacao;

    const dataOperacao = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const tool = await Tools.findByIdAndUpdate(id, { dataOperacao, tipoOperacao});
    const usuario = await User.findOne({ codigo: body.codigo }); // Busca o usuário pelo código  

    console.log('Usuário encontrado:', usuario);
    console.log('Ferramenta encontrada:', tool);

    registrarLog('PUT', tool, tipoOperacao, dataOperacao, usuario);

    return NextResponse.json({message: "Requisição concluída com sucesso!"}, {status: 201});
    
}