import { Survei } from "@/types/survei";

type Props = {
  data: Survei[];
};

export default function SurveyTable({ data }: Props) {

  const getLabel = (nilai: number) => {
  switch (nilai) {
    case 1:
      return "😞 Kurang";
    case 2:
      return "😐 Cukup";
    case 3:
      return "😊 Baik";
    default:
      return "-";
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 overflow-x-auto">

      <h2 className="text-2xl font-bold mb-5">
        Data Hasil Survei
      </h2>

      <table className="min-w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left p-3">Tanggal</th>

            <th className="text-left p-3">Loket</th>

            <th className="text-center p-3">Kebersihan Loket</th>

            <th className="text-center p-3">Keramahan Petugas</th>

            <th className="text-center p-3">Solusi Pelayanan</th>

            <th className="text-center p-3">Informasi Pelayanan</th>

            <th className="p-3 text-center">Kepuasan</th>

          </tr>

        </thead>

        <tbody>

          {data.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="p-3">
                {item.tanggal}
              </td>

              <td className="p-3">
                {item.loket}
              </td>

              <td className="text-center">
                {getLabel(item.kebersihan)}
              </td>

              <td className="text-center">
                {getLabel(item.keramahan)}
              </td>

              <td className="text-center">
                {getLabel(item.solusi)}
              </td>

              <td className="text-center">
                {getLabel(item.informasi)}
              </td>

              <td className="p-3 text-center text-3xl">
                {item.rataRata >= 2.5
                ? "😍"
                : item.rataRata >= 2
                ? "😊"
                : item.rataRata >= 1.5
                ? "😐"
                : "😞"}
            </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}