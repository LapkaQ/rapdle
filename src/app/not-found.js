import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex flex-col h-auto grow relative">
      <h1 className="text-9xl font-black whiteGlow animate-bounce">404</h1>
      <h1 className="text-4xl font-medium whiteGlow">Strona nie znaleziona</h1>
      <p className="font-light p-2 whiteGlow">
        Przepraszamy, ale strona, której szukasz, nie istnieje. Możesz wrócić do{" "}
        <Link
          href="/"
          className="text-[color:rgb(var(--foreground2-rgb))] animate-pulse"
        >
          strony głównej
        </Link>
        .
      </p>
    </main>
  );
}
