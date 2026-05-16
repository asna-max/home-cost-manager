export default function AppCard({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white
        dark:bg-gray-800
        border
        border-gray-200
        dark:border-gray-700
        rounded-2xl
        shadow-sm
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}
