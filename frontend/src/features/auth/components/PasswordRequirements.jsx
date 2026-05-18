import { FaCheck } from "react-icons/fa";

export default function PasswordRequirements({ validation }) {
  const requirements = [
    {
      label: "Minimum 8 characters",
      valid: validation.minLength,
    },

    {
      label: "Uppercase letter",
      valid: validation.uppercase,
    },

    {
      label: "Lowercase letter",
      valid: validation.lowercase,
    },

    {
      label: "Number",
      valid: validation.number,
    },

    {
      label: "Special character",
      valid: validation.special,
    },
  ];

  return (
    <div
      className="
        bg-gray-50
        dark:bg-gray-900
        border
        border-gray-200
        dark:border-gray-700
        rounded-xl
        p-4
        space-y-2
      "
    >
      {requirements.map((item) => (
        <div
          key={item.label}
          className="
              flex
              items-center
              gap-2
              text-sm
            "
        >
          <FaCheck
            className={item.valid ? "text-green-500" : "text-gray-400"}
          />

          <span
            className={
              item.valid
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400"
            }
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
