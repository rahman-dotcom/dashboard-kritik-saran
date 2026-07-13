"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TerimaKasihPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const loket = searchParams.get("loket") || "1";

  
  return (
    <main className="min-h-screen bg-blue-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl text-center">

        <div className="text-7xl mb-6">
          😊
        </div>

        <h1 className="text-4xl font-bold text-blue-900">
          Terima Kasih
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Penilaian Anda telah berhasil dikirim.
        </p>

      </div>
    </main>
  );
}