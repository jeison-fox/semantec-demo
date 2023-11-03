import dynamic from "next/dynamic";

function NoSSRWrapper({ children }: { children: React.ReactNode }) {
  return children;
}

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
