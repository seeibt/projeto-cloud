import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Log from "@/models/log";

export async function GET() {
    await connectDB();

    // Obtém os logs ordenados por dataOperacao em ordem decrescente diretamente do banco de dados
    const logs = await Log.find({}).sort({ dataOperacao: -1 });

    return NextResponse.json(logs, { status: 200 });
}