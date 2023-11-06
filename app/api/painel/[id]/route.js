import connectDB from "@/libs/mongodb";
import Tools from "@/models/tools";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const { id } = params;
    
    await connectDB();
    const tools = await Tools.findOne({ _id: id});

    return NextResponse.json({ tools }, {status: 200});
}