import { prisma } from "@/app/utils/db";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, XCircle } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/general/EmptyState";
import { PaginationComponent } from "@/components/general/PaginationComponent";

type NewsType = {
  id: string;
  headings: string;
  sourceIdName: string;
  link: "FACEBOOK" | "INSTAGRAM" | "TWITTER";
  createdAt: Date;
  updatedAt: Date;
};

async function getAllNews(page: number = 1, pageSize: number = 10) {
  const skip = (page - 1) * pageSize;

  const [news, totalCount] = await Promise.all([
    prisma.publicSourceNews.findMany({
      take: pageSize,
      skip,
      orderBy: { createdAt: "desc" },
    }),
    prisma.publicSourceNews.count(),
  ]);

  return {
    news,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function PublicNewsPage({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { news, totalCount, totalPages } = await getAllNews(currentPage);

  return (
    <>
      <div className="flex items-center justify-between mb-8 bg-accent-foreground/5 p-2">
        <h1 className="text-xl font-bold">Manage Public News</h1>
        <div className="text-sm bg-primary text-white px-3 py-1 rounded-md">
          Total: {totalCount}
        </div>
      </div>

      {news.length > 0 ? (
        <div className="flex flex-col gap-6">
          <Card className="rounded-xs">
            <CardContent className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Heading</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {news.map((n) => (
                    <TableRow key={n.id}>
                      <TableCell className="py-2 px-3">{n.headings}</TableCell>
                      <TableCell className="py-2 px-3">{n.sourceIdName}</TableCell>
                      <TableCell className="py-2 px-3">{n.link}</TableCell>
                      <TableCell className="py-2 px-3">
                        {n.createdAt.toLocaleString()}
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/post-an-article/public-source-news/all-public-source-news/${n.id}/delete`}
                                className="flex items-center text-red-600"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <PaginationComponent totalPages={totalPages} currentPage={currentPage} />
        </div>
      ) : (
        <EmptyState
          title="No Public News Found"
          description="There are currently no news posts available."
          buttonText="Go to Dashboard"
          href="/"
        />
      )}
    </>
  );
}
