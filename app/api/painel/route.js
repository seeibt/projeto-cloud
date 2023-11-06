import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Tools from "@/models/tools";

export async function GET(){
   
    await connectDB();

    const tools = await Tools.find({});

    return NextResponse.json(tools, {status: 200});
}
