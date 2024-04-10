import connectToDB from "@/utlis/connectMongo";
import userModal from "@/utlis/model/user";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectToDB();

    const count = await userModal.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }]);

    return NextResponse.json({ count: count[0].count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching count:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
