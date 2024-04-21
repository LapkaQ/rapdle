import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Rapdle",
  description: "Zgadnij artystę czy coś",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col justify-between">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
