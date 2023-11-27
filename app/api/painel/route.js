import { NextResponse } from 'next/server';
import connectDB from "../../../libs/mongodb";
import Tools from "@/models/tools";
import User from "@/models/user";
import Log from "@/models/log";

const nodemailer = require('nodemailer');

export async function GET(){
   
    await connectDB();

    return NextResponse.json("Sim, ta funcionando!", {status: 200});
}

function registrarLog(tipo, ferramenta, tipoOperacao, dataOperacao, usuario) {

    const log = new Log({
        tipo: tipo,
        ferramenta: JSON.stringify(ferramenta),
        tipoOperacao: tipoOperacao,
        dataOperacao: dataOperacao,
        usuario: JSON.stringify(usuario),
    });

    log.save();
}

async function registrarRetirada(tool, dataOperacao) {
    const log = new Log({
        tipo: 'POST',
        ferramenta: JSON.stringify(tool),
        tipoOperacao: 'Retirada',
        dataOperacao: dataOperacao,
        usuario: JSON.stringify({ nome: 'Usuário não identificado' }),
    });

    await log.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'logautopecasmuller@gmail.com',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN,
        },
    });

    const mailOptions = {
        from: 'logautopecasmuller@gmail.com',
        to: 'seibteduardo@gmail.com; amguto47@gmail.com; victorwelter2003@gmail.com; eriquewillers@gmail.com; angelodalzotto97@gmail.com',
        subject: 'Ferramenta retirada sem autenticação!',
        text: 'A ferramenta com o nome ' + tool.nome + ' foi retirada sem autenticação às ' + dataOperacao + '!',
    };

    await transporter.sendMail(mailOptions);
}

export async function POST(req) {

    await connectDB();

    const body = await req.json();

    const ferramenta = await Tools.findOne({posicao: body.posicao});

    if(!ferramenta){
        return NextResponse.json({message: "Ferramenta não encontrada!"}, {status: 402});
    }

    const id = ferramenta.id; 
    const tipoOperacao = body.tipoOperacao;

    const dataOperacao = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const tool = await Tools.findByIdAndUpdate(id, { dataOperacao, tipoOperacao});

    const usuario = await User.findOne({ codigo: body.codigo });

    if(!usuario && tipoOperacao == 'Retirada'){
        await registrarRetirada(tool, dataOperacao);

        return NextResponse.json({message: "Usuário não encontrado!"}, {status: 403});
    } else {
        await registrarLog('POST', tool, tipoOperacao, dataOperacao, usuario);
    }

    return NextResponse.json({message: "Requisição concluída com sucesso!"}, {status: 201});
    
}