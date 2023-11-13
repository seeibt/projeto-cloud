import connectDB from "@/libs/mongodb";
import Log from "@/models/log";
import Tools from "@/models/tools";
import User from "@/models/user";
import { NextResponse } from "next/server";


async function registrarRetirada(tool, tipoOperacao, dataOperacao) {
  // Register log
  const log = new Log({
      tipo: 'POST',
      ferramenta: JSON.stringify(tool),
      tipoOperacao: 'Retirada',
      dataOperacao: dataOperacao,
      usuario: JSON.stringify({ nome: 'Usuário não identificado' }),
  });

  await log.save();

  // Send email
  const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
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
      //to many emails
      to: 'seibteduardo@gmail.com; amguto47@gmail.com; victorwelter2003@gmail.com; rauberimports@gmail.com;',
      subject: 'Ferramenta retirada sem autenticação!',
      text: 'A ferramenta com o nome ' + tool.nome + ' foi ' + tipoOperacao + ' sem autenticação às ' + dataOperacao + '!',
  };

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.error('Error sending email: ', error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}


export async function PUT(req, {params}){
    await connectDB();

    const { id } = params;
    const { newNome: nome, newPosicao: posicao, tipoOperacao: tipoOperacao } = await req.json();

    const dataOperacao = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const tools = await Tools.findByIdAndUpdate(id, { nome, posicao, dataOperacao, tipoOperacao});

    if(!tools) return NextResponse.json({message: "Ferramenta não encontrada!"}, {status: 404});

    registrarRetirada(tools, tipoOperacao, dataOperacao);

    return NextResponse.json(tools, {status: 200});
}

export async function GET(req, {params}){
    const { id } = params;
    
    await connectDB();
    const tools = await Tools.findOne({ _id: id});

    return NextResponse.json({ tools }, {status: 200});
}