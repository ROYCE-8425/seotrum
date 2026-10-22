import config from "@/config/config.json";
import theme from "@/config/theme.json";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import "@/styles/main.css";
import { GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    <html suppressHydrationWarning={true} lang="vi" className="scroll-smooth">
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

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />
      </head>

      <body
        suppressHydrationWarning={true}
        className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#202326] antialiased"
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
