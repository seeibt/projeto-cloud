import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Tools from "@/models/tools";

export async function GET(){
   
    await connectDB();

    return NextResponse.json("Sim, ta funcionando!", {status: 200});
}
export async function POST(req) {
    try {
        const { body } = await req.json();
        
        // Depure o conteúdo da requisição
        console.log('Conteúdo da requisição:', body);

        // Acessando o valor 'posicao' do JSON
        const posicao = body.posicao;

        console.log('Posição:', posicao);
        
        // Faça o que você precisa com os dados
        
        // Retorne uma resposta, se necessário
        return {
            status: 200, // Código de status HTTP 200 (OK)
            body: JSON.stringify({ message: 'Requisição POST recebida com sucesso' })
        };
    } catch (error) {
        console.error('Erro ao analisar o corpo da requisição:', error);

        // Retorne uma resposta de erro, se necessário
        return {
            status: 400, // Código de status HTTP 400 (Bad Request)
            body: JSON.stringify({ error: 'Erro ao analisar o corpo da requisição' })
        };
    }
}