import connectDB from "@/libs/mongodb";
import Log from "@/models/log";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const { id } = params;
    
    await connectDB();
    const log = await Log.findOne({ _id: id});

    return NextResponse.json({ log }, {status: 200});
}