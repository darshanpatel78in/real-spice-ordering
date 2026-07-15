"use client";

import { QRCodeSVG } from "qrcode.react";

export default function QRPage() {
  const totalTables = 20;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Restaurant Table QR Codes
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-black">
        {Array.from({ length: totalTables }).map((_, index) => {
          const table = index + 1;

          return (
            <div
              key={table}
              className="border rounded-xl p-4 text-center bg-white"
            >
              <h2 className="font-bold mb-4">
                Table {table}
              </h2>

              <QRCodeSVG
  value={`http://localhost:3000/table/${table}`}
  size={180}
  className="mx-auto"
/>
              <p className="mt-3 text-sm text-black">
                Scan to Order
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}