import { prisma } from "@/app/utils/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book, CheckCircle, MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import { EmptyState } from "@/components/general/EmptyState";
import { requireSompandokOrSuperAdmin } from "@/app/utils/requireUser";
import { redirect } from "next/navigation";
import { PaginationComponent } from "@/components/general/PaginationComponent";
import { requireRoleAccess } from "../../roleBaseAccess";

async function getAllAdvertisements(page: number = 1, pageSize: number = 10) {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    prisma.advertisement.findMany({
      take: pageSize,
      skip,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        companyName: true,
        companyaddress: true,
        supervisedName: true,
        supervisedPhonenumber: true,
        advertisedCategory: true,
        websiteLink: true,
        additionalInfo: true,
        advertiseBanner: true,
        isFeatured: true,
        endDate: true,
        startDate: true,
        advertiseduration: true,
        advertiseStatus: true,
        createdAt: true,
        updatedAt: true,
        country:true,
      },
    }),
    prisma.advertisement.count(),
  ]);

  return { ads: data, totalCount, totalPages: Math.ceil(totalCount / pageSize) };
}

type SearchParamsProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AllAdvertisementTable({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const SompandokOrSuperAdmin = await requireSompandokOrSuperAdmin();
  if (!SompandokOrSuperAdmin) return redirect("/restricted");

  const { ads, totalCount, totalPages } = await getAllAdvertisements(currentPage);

   const rewuireUserToAccessPage = await requireRoleAccess([
          "EDITOR",
          "SUPERADMIN"
        ]);

  return (
    <>
      <h1 className="text-xl font-bold bg-accent-foreground/5 p-2 mb-2 flex justify-between items-center">
        <span>Manage Advertisements</span>
        <div className="text-sm bg-primary text-white px-3 py-1 rounded-md">
          Total: {totalCount}
        </div>
      </h1>

      {ads.length > 0 ? (
        <>
          <Card className="rounded-xs">
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Supervisor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                    <TableHead>Banner</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ads.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell>{ad.companyName}</TableCell>
                      <TableCell>{ad.supervisedName}</TableCell>
                      <TableCell>{ad.advertisedCategory}</TableCell>
                      <TableCell>{ad.advertiseStatus}</TableCell>
                      <TableCell>{ad.advertiseduration ?? "N/A"}</TableCell>
                      <TableCell>{ad.startDate}</TableCell>
                      <TableCell>{ad.endDate}</TableCell>
                      <TableCell>
                        <Image
                          src={ad.advertiseBanner}
                          alt={ad.companyName}
                          width={100}
                          height={50}
                          className="rounded"
                        />
                      </TableCell>
                      <TableCell>{ad.country}</TableCell>
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
                              <Link href={`/post-an-article/post-advertisement/alladvertise/${ad.id}/updatestatus`}>
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                Update Status
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/post-an-article/post-advertisement/alladvertise/${ad.id}/delete`}>
                                <XCircle className="w-4 h-4 mr-2 text-red-500" />
                                Delete
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/post-an-article/post-advertisement/alladvertise/${ad.id}/adinvoice`}>
                                <Book className="w-4 h-4 mr-2" />
                                Invoice
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

          {/* ✅ Pagination below table */}
          <PaginationComponent totalPages={totalPages} currentPage={currentPage} />
        </>
      ) : (
        <EmptyState
          title="No Advertisements Found"
          description="There are currently no advertisements available."
          buttonText="Go to Dashboard"
          href="/"
        />
      )}
    </>
  );
}
