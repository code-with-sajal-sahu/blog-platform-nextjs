import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { Category } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const parsedPage = Number(searchParams.get("page"));
  const catg = searchParams.get("category");
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const DATA_PER_PAGE = 4;
  const query = {
    take: DATA_PER_PAGE,
    skip: DATA_PER_PAGE * (currentPage - 1),
    include: {category: true, user: true},
    where: {
      ...(!!catg && { categorySlug: catg }),
    },
  };
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    let categoryDetail: Category | null = null;
    if (catg) {
      categoryDetail = await prisma.category.findUnique({
        where: { slug: "catg" },
      });
    }
    const totalPages = Math.ceil(count / DATA_PER_PAGE);
    return NextResponse.json(
      { posts, currentPage, totalPages, category: categoryDetail },
      { status: 200 },
    );
  } catch (error) {
    console.error("Post API Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 200 },
    );
  }
};
