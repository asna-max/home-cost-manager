export default function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Total",
      value: summary.total,
      color: "bg-blue-500",
    },
    {
      title: "Electricity",
      value: summary.electricity,
      color: "bg-yellow-400",
    },
    {
      title: "Water",
      value: summary.water,
      color: "bg-cyan-500",
    },
    {
      title: "Heating",
      value: summary.heating,
      color: "bg-red-400",
    },
    {
      title: "Other",
      value: summary.other,
      color: "bg-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`
            ${card.color}
            text-white
            rounded-xl
            shadow
            p-5
            transition-transform
            hover:scale-[1.02]
          `}
        >
          {/* TITLE */}
          <p className="text-sm opacity-90">{card.title}</p>

          {/* VALUE */}
          <h3 className="text-2xl font-semibold mt-2">
            CHF {Number(card.value || 0).toFixed(2)}
          </h3>
        </div>
      ))}
    </div>
  );
}
