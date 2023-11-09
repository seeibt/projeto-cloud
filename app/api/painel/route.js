import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Tools from "@/models/tools";

export async function GET(){
   
    await connectDB();

    const tools = await Tools.find({});

    return NextResponse.json(tools, {status: 200});
}

export async function POST(req){

    const body = await req.json();

    console.log(body)
    //fazer aqui o put pra ferramentas e lá dentro já faz o registro do log

}
