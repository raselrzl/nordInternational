"use client";

import { useState, useEffect } from "react";
import { createAdvertisementPackage, getAdvertisementPackagePrice } from "@/app/actions";
import { advertisementPackages } from "./constantPackages";

export default function PackageForm() {
  const [selectedPackageId, setSelectedPackageId] = useState(advertisementPackages[0].id);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch price from DB when package changes
  useEffect(() => {
    async function fetchPrice() {
      const pkg = advertisementPackages.find((p) => p.id === selectedPackageId);
      if (!pkg) return;

      const dbPrice = await getAdvertisementPackagePrice(pkg.id);
      setPrice(dbPrice);
    }

    fetchPrice();
  }, [selectedPackageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const pkg = advertisementPackages.find((p) => p.id === selectedPackageId);
    if (!pkg) return;

    try {
      const result = await createAdvertisementPackage({
        id: pkg.id,
        name: pkg.name,
        page: pkg.page,
        dailyPrice: price,
      });

      if (result.status === "created") {
        alert("Package created successfully!");
      } else if (result.status === "updated") {
        alert("Package price updated successfully!");
      } else {
        alert("No changes made. Price is already the same.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save package");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPackageId(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Advertisement Package</h2>

      <label className="block mb-2">
        Select Package
        <select
          value={selectedPackageId}
          onChange={handleSelectChange}
          className="w-full border rounded px-2 py-1 mt-1"
        >
          {advertisementPackages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} ({pkg.page})
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Daily Price
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border rounded px-2 py-1 mt-1"
          min={0}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save Package"}
      </button>
    </form>
  );
}
