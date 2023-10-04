import { ClerkApp } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

// This doesn't work out of the box because Cloudflare Pages stores env vars
// in context. See line 10 of server.ts
// export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export const loader = (args: LoaderFunctionArgs) => {
  return rootAuthLoader(args, {
    // types added to remix.env.d.ts
    secretKey: args.context.env.CLERK_SECRET_KEY,
    publishableKey: args.context.env.CLERK_PUBLISHABLE_KEY,
  });
};

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Wrap your app in ClerkApp(app)
export default ClerkApp(App);