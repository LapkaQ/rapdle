"use client";
import { useEffect } from "react";
import Link from "next/link";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
export default function header() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "bar inline",
          position: "bottom",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: {
          readOnly: true,
        },
        functionality: {},
      },
      language: {
        default: "en",
        autoDetect: "browser",
        translations: {
          en: {
            consentModal: {
              title: "Cześć podróżniku, nadszedł czas na ciasteczka!",
              description:
                "Ciasteczka są niezbędne do zapewnienia prawidłowego działania naszej strony internetowej. Służą one do zapewnienia wydajności oraz funkcjonalności naszego serwisu. Bez tych plików cookie niektóre funkcje strony mogą nie działać poprawnie, co może negatywnie wpłynąć na doświadczenie użytkownika.",
              closeIconLabel: "",
              acceptAllBtn: "Zaakceptuj",
              acceptNecessaryBtn: "Odrzuć",
            },
            preferencesModal: {
              title: "Centrum Preferencji dotyczących Zgody",
              closeIconLabel: "Zamknij okno modalne",
              acceptAllBtn: "Zaakceptuj wszystko",
              acceptNecessaryBtn: "Odrzuć wszystko",
              savePreferencesBtn: "Zapisz preferencje",
              serviceCounterLabel: "Usługa|Usługi",
              sections: [],
            },
          },
        },
      },
      disablePageInteraction: true,
    });
  }, []);
  return (
    <header className="flex justify-center items-center flex-row p-5 gap-20">
      <Link href="/">Home</Link>
      <Link href="/rules">Rules</Link>
      <Link href="/about">About</Link>
    </header>
  );
}
