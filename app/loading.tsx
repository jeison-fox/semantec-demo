import Spinner from "@/components/spinners/Spinner";

export default function Loading() {
  return (
    <div className="bg-green-dark-jungle flex h-full items-center justify-center relative w-full z-50">
      <Spinner size="large" />
    </div>
  );
}
