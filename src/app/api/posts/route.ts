import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { Post } from "@/types/post";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const parsedPage = Number(searchParams.get("page"));
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;
  const DATA_PER_PAGE = 4;
  try {
    const posts: Post[] = await prisma.post.findMany({
      take: DATA_PER_PAGE,
      skip: DATA_PER_PAGE * (currentPage - 1),
    });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Post API Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 200 },
    );
  }
};
