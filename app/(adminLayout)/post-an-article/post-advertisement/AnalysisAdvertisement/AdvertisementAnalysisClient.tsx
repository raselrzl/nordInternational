"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { EmptyState } from "@/components/general/EmptyState";
import { useState, useEffect, useMemo } from "react";

type AdvertisementWithProfile = {
  id: string;
  companyName: string;
  supervisedName: string;
  advertisedCategory: string;
  country: string | null;
  dailyPrice: number;
  advertiseduration: number | null;
  discount: number; // in %
  moms: number; // VAT in %
  advertiseStatus: string;
  createdAt: Date;
};

interface Props {
  serverAds: AdvertisementWithProfile[];
}

export default function AdvertisementAnalysisClient({ serverAds }: Props) {
  const [ads, setAds] = useState<AdvertisementWithProfile[]>(serverAds);
  const [filteredAds, setFilteredAds] = useState<AdvertisementWithProfile[]>(serverAds);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filtering logic
  useEffect(() => {
    let temp = [...ads];
    if (search) {
      temp = temp.filter(
        (ad) =>
          ad.companyName.toLowerCase().includes(search.toLowerCase()) ||
          ad.supervisedName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter) temp = temp.filter((ad) => ad.advertisedCategory === categoryFilter);
    if (statusFilter) temp = temp.filter((ad) => ad.advertiseStatus === statusFilter);

    setFilteredAds(temp);
    setPage(1);
  }, [search, categoryFilter, statusFilter, ads]);

  const totalPages = Math.ceil(filteredAds.length / pageSize);
  const paginatedAds = filteredAds.slice((page - 1) * pageSize, page * pageSize);

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter(null);
    setStatusFilter(null);
  };

  // Calculate total per ad
  const calculateTotal = (ad: AdvertisementWithProfile) => {
    const duration = ad.advertiseduration || 1;
    return ad.dailyPrice * duration * (1 + ad.moms / 100) * (1 - (ad.discount || 0) / 100);
  };

  // Calculate total per category
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    filteredAds.forEach((ad) => {
      const total = calculateTotal(ad);
      if (totals[ad.advertisedCategory]) {
        totals[ad.advertisedCategory] += total;
      } else {
        totals[ad.advertisedCategory] = total;
      }
    });
    return totals;
  }, [filteredAds]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Advertisement Analysis</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <Input
          placeholder="Search by Company or Supervisor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={(value) => setCategoryFilter(value || null)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            {[
              "PREMIER_1","PREMIER_2","SIZE_1","SIZE_2","SUPER_1","SUPER_2",
              "PREMIUM_1","PREMIUM_2","STANDARD_1","STANDARD_2","DELUXE_1","DELUXE_2",
              "ULTIMATE_1","ULTIMATE_2","BASIC_1","BASIC_2","PRO_1","PRO_2","ENTERPRISE_1","ENTERPRISE_2"
            ].map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setStatusFilter(value || null)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            {["ACTIVE", "DRAFT", "EXPIRED"].map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} variant="outline">
          Clear Filters
        </Button>
      </div>

      {filteredAds.length === 0 ? (
        <EmptyState
          title="No advertisements found"
          description="Try changing your filters or search term"
          buttonText="Reset Filters"
          href="/post-an-article/post-advertisement/alladvertise"
        />
      ) : (
        <Card className="overflow-x-auto">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Daily Price (SEK)</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Discount (%)</TableHead>
                  <TableHead>Moms (%)</TableHead>
                  <TableHead>Total (SEK)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAds.map((ad) => {
                  const total = calculateTotal(ad);
                  return (
                    <TableRow key={ad.id}>
                      <TableCell>{ad.companyName}</TableCell>
                      <TableCell>{ad.supervisedName}</TableCell>
                      <TableCell>{ad.advertisedCategory}</TableCell>
                      <TableCell>{ad.country || "-"}</TableCell>
                      <TableCell>{ad.dailyPrice}</TableCell>
                      <TableCell>{ad.advertiseduration || "-"}</TableCell>
                      <TableCell>{ad.discount || 0}%</TableCell>
                      <TableCell>{ad.moms || 25}%</TableCell>
                      <TableCell>{total.toFixed(2)}</TableCell>
                      <TableCell>{ad.advertiseStatus}</TableCell>
                      <TableCell>{format(new Date(ad.createdAt), "yyyy-MM-dd")}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <div className="mt-4">
              <h2 className="font-bold mb-2">Category Totals (SEK)</h2>
              {Object.entries(categoryTotals).map(([category, total]) => (
                <div key={category} className="flex justify-between border-b py-1">
                  <span>{category}</span>
                  <span>{total.toFixed(2)} SEK</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Prev
              </Button>
              <span className="flex items-center">{page} / {totalPages}</span>
              <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
