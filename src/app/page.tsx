"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import {
  FaSmile,
  FaFrown,
  FaMoon,
  FaSun,
  FaFileExcel,
} from "react-icons/fa";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Kritik = {
  id: string;
  tanggal: string;
  loket: string;
  pelayanan: string;
  jenis: string;
  kritikSaran: string;
  emoji: string;
};

export default function Home() {
  const [data, setData] = useState<Kritik[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filterLoket, setFilterLoket] = useState("Semua");

  useEffect(() => {
    const q = query(
      collection(db, "kritik_saran"),
      orderBy("tanggal", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const result: Kritik[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Kritik[];

      setData(result);
    });

    return () => unsubscribe();
  }, []);

  const filteredData =
    filterLoket === "Semua"
      ? data
      : data.filter((item) => item.loket === filterLoket);

  const totalSaran = data.filter(
    (item) => item.jenis === "Saran"
  ).length;

  const totalKritik = data.filter(
    (item) => item.jenis === "Kritik"
  ).length;

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "KritikSaran"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "dashboard-kritik-saran.xlsx");
  };

  const chartData = [
    {
      name: "Saran",
      value: totalSaran,
    },
    {
      name: "Kritik",
      value: totalKritik,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <main
      className={`min-h-screen p-6 transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard Kritik & Saran
            </h1>

            <p className="opacity-70 mt-2">
              Monitoring Pelayanan Realtime
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-xl bg-blue-600 text-white"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* CARD */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg">Total Data</h2>
            <p className="text-4xl font-bold mt-2">
              {data.length}
            </p>
          </div>

          <div className="bg-green-600 text-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg">Total Saran</h2>
            <p className="text-4xl font-bold mt-2">
              {totalSaran}
            </p>
          </div>

          <div className="bg-red-600 text-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg">Total Kritik</h2>
            <p className="text-4xl font-bold mt-2">
              {totalKritik}
            </p>
          </div>
        </div>

        {/* FILTER */}
        <div className="flex gap-4 mb-6 flex-wrap">

          <select
            value={filterLoket}
            onChange={(e) =>
              setFilterLoket(e.target.value)
            }
            className="px-4 py-3 rounded-xl border"
          >
            <option>Semua</option>
            <option>Loket 1</option>
            <option>Loket 2</option>
          </select>

          <button
            onClick={exportExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl"
          >
            <FaFileExcel />
            Export Excel
          </button>
        </div>

        {/* GRAFIK */}
        <div
          className={`rounded-2xl p-6 shadow-xl mb-8 ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">
            Statistik Kritik & Saran
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LIST DATA */}
        <div className="grid gap-5">

          {filteredData.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-6 shadow-xl transition ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-2xl font-bold">
                    {item.pelayanan}
                  </h2>

                  <p className="opacity-70 mt-2">
                    {item.loket}
                  </p>

                  <p className="mt-4 text-lg">
                    {item.kritikSaran}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
                      {item.jenis}
                    </span>

                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full">
                      {item.tanggal}
                    </span>
                  </div>
                </div>

                <div className="text-5xl">
                  {item.emoji}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}