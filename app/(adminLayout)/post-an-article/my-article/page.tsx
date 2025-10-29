import { prisma } from "@/app/utils/db";
import { requireNewsReporter, requireUser } from "@/app/utils/requireUser";
import { trackRoute } from "@/app/utils/routeTracker";
import { EmptyState } from "@/components/general/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import Link from "next/link";
import { PaginationComponent } from "@/components/general/PaginationComponent";
import { requireRoleAccess } from "../roleBaseAccess";

// ✅ Define TypeScript type matching your Prisma schema
type MyArticleType = {
  id: string;
  newsHeading: string;
  newsResource: string;
  newsLocation?: string | null;
  newsCategory: string;
  newsPicture: string;
  newsPictureHeading: string;
  newsPictureCredit: string;
  isFeatured: boolean;
  newsDetails: string;
  newsReporter?: { reporterName: string | null } | null;
  newsArticleStatus: "ACTIVE" | "DRAFT" | "EXPIRED";
  createdAt: Date;
  updatedAt: Date; // ✅ Include updatedAt
  quotes: { speakerInfo: string; text: string }[];
};

async function getMyArticles(
  userId: string,
  page: number = 1,
  pageSize: number = 8
): Promise<{ articles: MyArticleType[]; totalCount: number; totalPages: number }> {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { newsReporter: { userId } },
      take: pageSize,
      skip,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true, // ✅ include updatedAt
        isFeatured: true,
        newsCategory: true,
        newsDetails: true,
        newsHeading: true,
        newsPicture: true,
        quotes: { select: { speakerInfo: true, text: true } },
        newsResource: true,
        newsPictureHeading: true,
        newsPictureCredit: true,
        newsLocation: true,
        newsReporter: { select: { reporterName: true } },
        newsArticleStatus: true,
      },
    }),
    prisma.newsArticle.count({ where: { newsReporter: { userId } } }),
  ]);

  return { articles: data, totalCount, totalPages: Math.ceil(totalCount / pageSize) };
}

type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function MyArticle({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const requireUserToAccessPage = await requireRoleAccess([
    "EDITOR",
    "SUPERADMIN",
    "NEWSREPORTER",
  ]);
  const session = await requireUser();
  await requireNewsReporter();
  await trackRoute("MyArticle");

  const { articles, totalPages, totalCount } = await getMyArticles( session.id as string,
    currentPage);
  const userRole = requireUserToAccessPage?.userType;

  const canPublishOrDraft = userRole === "EDITOR" || userRole === "SUPERADMIN";
  const canDelete = userRole === "SUPERADMIN";

  return (
    <>
      <h1 className="text-xl font-bold bg-accent-foreground/5 p-2 mx-2 mb-2 flex justify-between items-center">
        <span>My Published All News Articles</span>
        <div className="text-sm bg-primary text-white px-3 py-1 rounded-md">
          Total: {totalCount}
        </div>
      </h1>

      {articles.length > 0 ? (
        <div className="flex flex-col gap-6 px-2">
          <Card className="rounded-xs">
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Heading</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        {article.newsPicture ? (
                          <img
                            src={article.newsPicture}
                            alt="News Image"
                            width={80}
                            height={50}
                            className="rounded object-fill h-[50px] w-[80px]"
                          />
                        ) : (
                          <div className="bg-gray-200 size-10 rounded flex items-center justify-center text-xs">
                            No Image
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {article.newsHeading?.split(" ").slice(0, 3).join(" ") ?? ""}..
                      </TableCell>
                      <TableCell>{article.newsCategory}</TableCell>
                      <TableCell>{article.newsArticleStatus}</TableCell>
                      <TableCell>{article.newsReporter?.reporterName ?? "Unknown"}</TableCell>
                      <TableCell>
                        {new Date(article.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{article.newsLocation ?? "N/A"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem asChild>
                              <Link
                                href={`/post-an-article/alaarticles/${article.id}/editarticle`}
                              >
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>

                            {canDelete && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/post-an-article/alaarticles/${article.id}/deletearticle`}
                                  >
                                    <XCircle className="w-4 h-4 mr-2 text-red-600" />
                                    Delete
                                  </Link>
                                </DropdownMenuItem>
                              </>
                            )}

                            {canPublishOrDraft && (
                              <>
                                <DropdownMenuSeparator />
                                {article.newsArticleStatus === "ACTIVE" ? (
                                  <DropdownMenuItem asChild>
                                    <Link
                                      href={`/post-an-article/alaarticles/${article.id}/updatestatustodraft`}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2 text-yellow-500" />
                                      Move to Draft
                                    </Link>
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem asChild>
                                    <Link
                                      href={`/post-an-article/alaarticles/${article.id}/updatestatustoactive`}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                      Publish
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <PaginationComponent totalPages={totalPages} currentPage={currentPage} />
        </div>
      ) : (
        <EmptyState
          title="No Articles Available"
          description="There are no articles to show. Please add some."
          buttonText="Go to Homepage"
          href="/"
        />
      )}
    </>
  );
}
