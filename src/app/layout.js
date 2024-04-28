import "./globals.css";
import "./globalicons.css";
import "./cookieconsent.css";
import "./blur.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Rapdle",
  description: "Zgadnij artystę czy coś",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta charSet="utf-8"></meta>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css"
        />
      </head>
      <body className="flex h-screen flex-col justify-between">
        <script type="module" src="cookieconsent-config.js"></script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
