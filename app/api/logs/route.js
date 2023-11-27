import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Log from "@/models/log";

export async function GET() {
    await connectDB();

    // sei la rs
    const logs = await Log.find({}).sort({ dataOperacao: -1 });

    return NextResponse.json(logs, { status: 200 });
}