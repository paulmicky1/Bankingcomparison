import React, { useState } from "react";

const banksData = [
  { name: "Danske Bank", fees: "Low", benefits: "No monthly fees for students", requirements: "CPR number required" },
  { name: "Nordea", fees: "Medium", benefits: "Easy online banking", requirements: "Passport and residence proof" },
  { name: "Nykredit", fees: "Low", benefits: "Free debit card", requirements: "Student ID required" },
];

export default function BankComparator() {
  const [search, setSearch] = useState("");

  const filteredBanks = banksData.filter((bank) =>
    bank.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Compare Banks for International Students in Denmark</h1>
      <input
        type="text"
        placeholder="Search bank..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="grid gap-4">
        {filteredBanks.map((bank, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{bank.name}</h2>
            <p><strong>Fees:</strong> {bank.fees}</p>
            <p><strong>Benefits:</strong> {bank.benefits}</p>
            <p><strong>Requirements:</strong> {bank.requirements}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
