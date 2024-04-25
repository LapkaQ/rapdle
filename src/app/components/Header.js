import Link from "next/link";
export default function header() {
  return (
    <header className="flex justify-center items-center flex-row p-5 gap-20">
      <Link href="/">Home</Link>
      <Link href="/rules">Rules</Link>
      <Link href="/about">About</Link>
      <Link href="/mode/rapper/normal">Game</Link>
    </header>
  );
}
