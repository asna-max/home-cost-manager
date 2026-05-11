export default function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
          w-full
          border
          border-gray-300
          rounded-xl
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
}
