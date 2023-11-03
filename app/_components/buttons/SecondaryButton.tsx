import clsx from "clsx";

import Spinner from "@/components/spinners/Spinner";

export default function SecondaryButton({
  disabled = false,
  fullWidth = false,
  icon,
  loading = false,
  loadingText = "Loading",
  onClick,
  text,
  type = "button",
}: ButtonDataProps) {
  const buttonClasses = clsx(
    "bg-gray-800 border border-solid border-gray-600 font-medium inline-flex gap-x-2 items-center justify-center px-5 py-2.5 rounded-lg text-center text-sm text-gray-400 transition-colors hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-800 disabled:cursor-not-allowed",
    { "w-full": fullWidth },
  );

  const buttonText = loading ? loadingText : text;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {!loading && icon}
      {loading && <Spinner />}
      <span className="text-gray-40 transition-color">{buttonText}</span>
    </button>
  );
}
