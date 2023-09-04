import { NextResponse } from "next/server";
import connectDB from "../../../libs/mongodb";
import Log from "@/models/log";

export async function GET(){
   
    await connectDB();
    //find que posição seja igual ao parametro

    const logs = await Log.find({});

    return NextResponse.json(logs, {status: 200});
}
