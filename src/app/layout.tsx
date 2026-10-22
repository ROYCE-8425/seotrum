import config from "@/config/config.json";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import "@/styles/main.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning={true}
      lang="vi"
      className={`scroll-smooth ${beVietnamPro.variable}`}
    >
      {config.google_tag_manager.enable && (
        <GoogleTagManager gtmId={config.google_tag_manager.gtm_id} />
      )}

      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="shortcut icon" href={config.site.favicon} />
        <meta name="theme-name" content="seotrum" />
        <meta name="msapplication-TileColor" content="#202326" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body
        suppressHydrationWarning={true}
        className={`${beVietnamPro.className} min-h-screen flex flex-col bg-[#FFFFFF] text-[#202326] antialiased`}
      >
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
