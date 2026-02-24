import type { ReactNode } from "react";
import * as Sentry from "@sentry/react-router";
import Script from "next/script";
import { Links, Meta, Outlet, Scripts } from "react-router";
import type { LinksFunction } from "react-router";
// planner imports
import { SITE_DESCRIPTION, SITE_NAME } from "@planner/constants";
import { cn } from "@planner/utils";
// types
// assets
import favicon96 from "@/app/assets/favicon/favicon-96x96.png?url";
import faviconIco from "@/app/assets/favicon/favicon.ico?url";
import icon192 from "@/app/assets/icons/icon-192x192.png?url";
import icon512 from "@/app/assets/icons/icon-512x512.png?url";
import ogImage from "@/app/assets/og-image.png?url";
import { LogoSpinner } from "@/components/common/logo-spinner";
import globalStyles from "@/styles/globals.css?url";
import type { Route } from "./+types/root";
// local
import { CustomErrorComponent } from "./error";
import { AppProvider } from "./provider";

const APP_TITLE = "Planner | Simple, extensible, open-source project management tool.";

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/png", sizes: "96x96", href: favicon96 },
  { rel: "shortcut icon", href: faviconIco },
  { rel: "manifest", href: "/site.webmanifest.json" },
  { rel: "apple-touch-icon", href: icon512 },
  { rel: "apple-touch-icon", sizes: "192x192", href: icon192 },
  { rel: "apple-touch-icon", sizes: "512x512", href: icon512 },
  { rel: "manifest", href: "/manifest.json" },
  { rel: "stylesheet", href: globalStyles },
];

export function Layout({ children }: { children: ReactNode }) {
  const isSessionRecorderEnabled = parseInt(process.env.VITE_ENABLE_SESSION_RECORDER || "0");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fff" />
        {/* Meta info for PWA */}
        <meta name="application-name" content="Planner" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="context-menu-portal" />
        <div id="editor-portal" />
        <AppProvider>
          <div
            className={cn(
              "h-screen w-full overflow-hidden bg-custom-background-100 relative flex flex-col",
              "app-container"
            )}
          >
            <main className="w-full h-full overflow-hidden relative">{children}</main>
          </div>
        </AppProvider>
        <Scripts />
        {!!isSessionRecorderEnabled && process.env.VITE_SESSION_RECORDER_KEY && (
          <Script id="clarity-tracking">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];if(y){y.parentNode.insertBefore(t,y);}
          })(window, document, "clarity", "script", "${process.env.VITE_SESSION_RECORDER_KEY}");`}
          </Script>
        )}
      </body>
    </html>
  );
}

export const meta: Route.MetaFunction = () => [
  { title: APP_TITLE },
  { name: "description", content: SITE_DESCRIPTION },
  { property: "og:title", content: APP_TITLE },
  {
    property: "og:description",
    content: "Open-source project management tool to manage work items, cycles, and product roadmaps easily",
  },
  { property: "og:url", content: "https://app.planner.oneworkspacex.com/" },
  { property: "og:image", content: ogImage },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "Planner - Modern project management" },
  {
    name: "keywords",
    content:
      "software development, plan, ship, software, accelerate, code management, release management, project management, work item tracking, agile, scrum, kanban, collaboration",
  },
  { name: "twitter:site", content: "@plannerpowers" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: ogImage },
  { name: "twitter:image:width", content: "1200" },
  { name: "twitter:image:height", content: "630" },
  { name: "twitter:image:alt", content: "Planner - Modern project management" },
];

export default function Root() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <LogoSpinner />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (error) {
    Sentry.captureException(error);
  }

  return <CustomErrorComponent error={error} />;
}
