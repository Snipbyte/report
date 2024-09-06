
import { NextResponse } from "next/server";
import connectDb from "../../../../backend/middleware/db"
export async function GET(
    req,
){
    try{

  return new NextResponse("Db Connected", { status: 200 });

    }catch(error){
console.log(error);
return new NextResponse("Internal Server Error", { status: 500 });
    }
}