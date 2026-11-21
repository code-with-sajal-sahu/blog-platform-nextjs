import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(
      { categories },
      { status: 200 }
    );
  } catch (error) {
    console.error("Category API Error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};