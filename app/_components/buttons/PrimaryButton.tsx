import clsx from "clsx";

import Spinner from "@/components/spinners/Spinner";

export default function PrimaryButton({
  disabled = false,
  fullWidth = false,
  loading = false,
  loadingText = "Loading",
  onClick,
  text,
  type = "button",
}: ButtonDataProps) {
  const buttonClasses = clsx(
    "bg-blue-600 font-medium inline-flex gap-x-2 items-center justify-center px-5 py-2.5 rounded-lg text-center text-sm text-white transition-colors hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:bg-blue-900 disabled:cursor-not-allowed",
    { "w-full": fullWidth },
  );

  const buttonTextClasses = clsx("text-white transition-color", {
    "text-gray-300": loading,
  });

  const buttonText = loading ? loadingText : text;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Spinner />}
      <span className={buttonTextClasses}>{buttonText}</span>
    </button>
  );
}
