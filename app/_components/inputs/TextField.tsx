export default function TextField({
  disabled = false,
  id,
  label,
  onChange,
  placeholder = "",
  required = false,
  type,
}: TextFieldDataProps) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-normal text-left text-white"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="bg-gray-700 block border border-gray-600 py-3 px-4 text-white text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
