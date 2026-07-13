type Props = {
  title: string;
  value: number | string;
  color: string;
  suffix?: string;
};

export default function StatCard({
  title,
  value,
  color,
  suffix,
}: Props) {
  return (
    <div className={`${color} rounded-2xl shadow-lg p-6 text-white`}>
      <p className="text-lg">{title}</p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
        {suffix}
      </h2>
    </div>
  );
}