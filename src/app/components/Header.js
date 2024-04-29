import Link from "next/link";
export default function header() {
  return (
    <header className="flex justify-center items-center flex-row p-5 gap-20 w-full">
      <Link href="/">Home</Link>
      <Link href="/rules">Rules</Link>
      <Link href="/about">About</Link>
    </header>
  );
}
