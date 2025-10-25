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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [filteredAds, setFilteredAds] =
    useState<AdvertisementWithProfile[]>(serverAds);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    let temp = [...ads];
    if (search) {
      temp = temp.filter(
        (ad) =>
          ad.companyName.toLowerCase().includes(search.toLowerCase()) ||
          ad.supervisedName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter)
      temp = temp.filter((ad) => ad.advertisedCategory === categoryFilter);
    if (statusFilter)
      temp = temp.filter((ad) => ad.advertiseStatus === statusFilter);

    setFilteredAds(temp);
    setPage(1);
  }, [search, categoryFilter, statusFilter, ads]);

  const totalPages = Math.ceil(filteredAds.length / pageSize);
  const paginatedAds = filteredAds.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter(null);
    setStatusFilter(null);
  };

  const calculateTotal = (ad: AdvertisementWithProfile) => {
    const duration = ad.advertiseduration || 1;
    const base = ad.dailyPrice * duration;
    const discountAmt = base * (ad.discount / 100);
    const withDiscount = base - discountAmt;
    const momsAmt = withDiscount * (ad.moms / 100);
    return {
      base,
      discountAmt,
      momsAmt,
      withDiscount,
      totalWithMoms: withDiscount + momsAmt,
      duration,
    };
  };

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    filteredAds.forEach((ad) => {
      const { totalWithMoms } = calculateTotal(ad);
      if (totals[ad.advertisedCategory]) {
        totals[ad.advertisedCategory] += totalWithMoms;
      } else {
        totals[ad.advertisedCategory] = totalWithMoms;
      }
    });
    return totals;
  }, [filteredAds]);

  // ✅ Overall summary
  const summary = useMemo(() => {
    let totalActive = 0;
    let totalDraft = 0;
    let totalExpired = 0;
    let totalDays = 0;
    let totalBase = 0;
    let totalDiscountAmt = 0;
    let totalExclMoms = 0;
    let totalInclMoms = 0;

    filteredAds.forEach((ad) => {
      const {
        base,
        discountAmt,
        momsAmt,
        withDiscount,
        totalWithMoms,
        duration,
      } = calculateTotal(ad);
      totalDays += duration;
      totalBase += base;
      totalDiscountAmt += discountAmt;
      totalExclMoms += withDiscount;
      totalInclMoms += totalWithMoms;
      if (ad.advertiseStatus === "ACTIVE") totalActive++;
      if (ad.advertiseStatus === "DRAFT") totalDraft++;
      if (ad.advertiseStatus === "EXPIRED") totalExpired++;
    });

    return {
      totalActive,
      totalDraft,
      totalExpired,
      totalDays,
      totalBase,
      totalDiscountAmt,
      totalExclMoms,
      totalInclMoms,
      totalAfterDiscount: totalExclMoms,
    };
  }, [filteredAds]);

  // ✅ Separate summaries for each status
  const summaryByStatus = useMemo(() => {
    const statuses = ["ACTIVE", "DRAFT", "EXPIRED"];
    const result: Record<string, any> = {};

    statuses.forEach((status) => {
      const filtered = filteredAds.filter(
        (ad) => ad.advertiseStatus === status
      );
      let totalDays = 0;
      let totalBase = 0;
      let totalDiscountAmt = 0;
      let totalExclMoms = 0;
      let totalInclMoms = 0;

      filtered.forEach((ad) => {
        const {
          base,
          discountAmt,
          momsAmt,
          withDiscount,
          totalWithMoms,
          duration,
        } = calculateTotal(ad);
        totalDays += duration;
        totalBase += base;
        totalDiscountAmt += discountAmt;
        totalExclMoms += withDiscount;
        totalInclMoms += totalWithMoms;
      });

      result[status] = {
        count: filtered.length,
        totalDays,
        totalBase,
        totalDiscountAmt,
        totalExclMoms,
        totalInclMoms,
      };
    });

    return result;
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
              "PREMIER_1",
              "PREMIER_2",
              "SIZE_1",
              "SIZE_2",
              "SUPER_1",
              "SUPER_2",
              "PREMIUM_1",
              "PREMIUM_2",
              "STANDARD_1",
              "STANDARD_2",
              "DELUXE_1",
              "DELUXE_2",
              "ULTIMATE_1",
              "ULTIMATE_2",
              "BASIC_1",
              "BASIC_2",
              "PRO_1",
              "PRO_2",
              "ENTERPRISE_1",
              "ENTERPRISE_2",
            ].map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setStatusFilter(value || null)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            {["ACTIVE", "DRAFT", "EXPIRED"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
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
            {/* Main Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Price / Per day (SEK)</TableHead>
                  <TableHead>Duration (Days)</TableHead>
                  <TableHead>Discount (%)</TableHead>
                  <TableHead>Moms (%)</TableHead>
                  <TableHead>Total (SEK)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAds.map((ad) => {
                  const { totalWithMoms } = calculateTotal(ad);
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
                      <TableCell>{totalWithMoms.toFixed(2)}</TableCell>
                      <TableCell>{ad.advertiseStatus}</TableCell>
                      <TableCell>
                        {format(new Date(ad.createdAt), "yyyy-MM-dd")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
              <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Prev
              </Button>
              <span className="flex items-center">
                {page} / {totalPages}
              </span>
              <Button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>

            {/* ✅ Tabs for Summary Sections */}
            <div className="mt-8">
              <Tabs defaultValue="overall" className="w-full">
                <TabsList className="flex flex-wrap justify-start mb-4">
                  <TabsTrigger value="overall">Overall Summary</TabsTrigger>
                  <TabsTrigger value="status">By Status</TabsTrigger>
                  <TabsTrigger value="category">By Category</TabsTrigger>
                  <TabsTrigger value="country">By Country</TabsTrigger>
                  <TabsTrigger value="company">By Company</TabsTrigger>
                </TabsList>

                {/* Overall Summary */}
                <TabsContent value="overall">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <h2 className="text-lg font-semibold mb-3">
                      Overall Advertisement Summary
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
                      <p>
                        <strong>Active Ads:</strong> {summary.totalActive}
                      </p>
                      <p>
                        <strong>Draft Ads:</strong> {summary.totalDraft}
                      </p>
                      <p>
                        <strong>Expired Ads:</strong> {summary.totalExpired}
                      </p>
                      <p>
                        <strong>Total Days:</strong> {summary.totalDays}
                      </p>
                      <p>
                        <strong>Total Base Price:</strong>{" "}
                        {summary.totalBase.toFixed(2)} SEK
                      </p>
                      <p>
                        <strong>Total Discount Amount:</strong>{" "}
                        {summary.totalDiscountAmt.toFixed(2)} SEK
                      </p>
                      <p>
                        <strong>Total Excl. Moms:</strong>{" "}
                        {summary.totalExclMoms.toFixed(2)} SEK
                      </p>
                      <p>
                        <strong>Total Incl. Moms:</strong>{" "}
                        {summary.totalInclMoms.toFixed(2)} SEK
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* By Status */}
                <TabsContent value="status">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["ACTIVE", "DRAFT", "EXPIRED"].map((status) => {
                      const s = summaryByStatus[status];
                      return (
                        <div
                          key={status}
                          className="p-4 border rounded-lg bg-muted/20"
                        >
                          <h3 className="font-semibold mb-2">
                            {status} Advertisements
                          </h3>
                          <p>
                            <strong>Total Count:</strong> {s.count}
                          </p>
                          <p>
                            <strong>Total Days:</strong> {s.totalDays}
                          </p>
                          <p>
                            <strong>Total Base:</strong>{" "}
                            {s.totalBase.toFixed(2)} SEK
                          </p>
                          <p>
                            <strong>Total Discount:</strong>{" "}
                            {s.totalDiscountAmt.toFixed(2)} SEK
                          </p>
                          <p>
                            <strong>Total Excl. Moms:</strong>{" "}
                            {s.totalExclMoms.toFixed(2)} SEK
                          </p>
                          <p>
                            <strong>Total Incl. Moms:</strong>{" "}
                            {s.totalInclMoms.toFixed(2)} SEK
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* By Category */}
                <TabsContent value="category">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <h2 className="text-lg font-semibold mb-3">
                      Category Totals (SEK)
                    </h2>
                    {Object.entries(categoryTotals).map(([category, total]) => (
                      <div
                        key={category}
                        className="flex justify-between border-b py-1"
                      >
                        <span>{category}</span>
                        <span>{total.toFixed(2)} SEK</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* By Country */}
                <TabsContent value="country">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(
                      filteredAds.reduce(
                        (acc, ad) => {
                          const country = ad.country || "Unknown";
                          const {
                            base,
                            discountAmt,
                            withDiscount,
                            totalWithMoms,
                          } = calculateTotal(ad);
                          if (!acc[country]) {
                            acc[country] = {
                              count: 0,
                              totalBase: 0,
                              totalDiscountAmt: 0,
                              totalExclMoms: 0,
                              totalInclMoms: 0,
                            };
                          }
                          acc[country].count += 1;
                          acc[country].totalBase += base;
                          acc[country].totalDiscountAmt += discountAmt;
                          acc[country].totalExclMoms += withDiscount;
                          acc[country].totalInclMoms += totalWithMoms;
                          return acc;
                        },
                        {} as Record<
                          string,
                          {
                            count: number;
                            totalBase: number;
                            totalDiscountAmt: number;
                            totalExclMoms: number;
                            totalInclMoms: number;
                          }
                        >
                      )
                    ).map(([country, stats]) => (
                      <div
                        key={country}
                        className="p-4 border rounded-lg bg-background"
                      >
                        <h3 className="font-semibold mb-2">{country}</h3>
                        <p>
                          <strong>Total Ads:</strong> {stats.count}
                        </p>
                        <p>
                          <strong>Total Base:</strong>{" "}
                          {stats.totalBase.toFixed(2)} SEK
                        </p>
                        <p>
                          <strong>Total Discount:</strong>{" "}
                          {stats.totalDiscountAmt.toFixed(2)} SEK
                        </p>
                        <p>
                          <strong>Total Excl. Moms:</strong>{" "}
                          {stats.totalExclMoms.toFixed(2)} SEK
                        </p>
                        <p>
                          <strong>Total Incl. Moms:</strong>{" "}
                          {stats.totalInclMoms.toFixed(2)} SEK
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* By Company */}
                <TabsContent value="company">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(
                      filteredAds.reduce(
                        (acc, ad) => {
                          const company = ad.companyName || "Unknown Company";
                          const {
                            base,
                            discountAmt,
                            withDiscount,
                            totalWithMoms,
                          } = calculateTotal(ad);
                          if (!acc[company]) {
                            acc[company] = {
                              count: 0,
                              totalBase: 0,
                              totalDiscountAmt: 0,
                              totalExclMoms: 0,
                              totalInclMoms: 0,
                            };
                          }
                          acc[company].count += 1;
                          acc[company].totalBase += base;
                          acc[company].totalDiscountAmt += discountAmt;
                          acc[company].totalExclMoms += withDiscount;
                          acc[company].totalInclMoms += totalWithMoms;
                          return acc;
                        },
                        {} as Record<
                          string,
                          {
                            count: number;
                            totalBase: number;
                            totalDiscountAmt: number;
                            totalExclMoms: number;
                            totalInclMoms: number;
                          }
                        >
                      )
                    ).map(([company, stats]) => (
                      <div
                        key={company}
                        className="p-4 border rounded-lg bg-background"
                      >
                        <h3 className="font-semibold mb-2">{company}</h3>
                        <p>
                          <strong>Total Ads:</strong> {stats.count}
                        </p>
                        <p>
                          <strong>Total Base:</strong>{" "}
                          {stats.totalBase.toFixed(2)} SEK
                        </p>
                        <p>
                          <strong>Total Discount:</strong>{" "}
                          {stats.totalDiscountAmt.toFixed(2)} SEK
                        </p>
                        <p>
                          <strong>Total Excl. Moms:</strong>{" "}
                          {stats.totalExclMoms.toFixed(2)} SEK
                        </p>
                        <p>
                          <strong>Total Incl. Moms:</strong>{" "}
                          {stats.totalInclMoms.toFixed(2)} SEK
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
