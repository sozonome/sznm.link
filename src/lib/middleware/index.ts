/* eslint-disable consistent-return */
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (req: NextRequest, event: NextFetchEvent) => {
  const urlSlug = req.nextUrl.pathname.split("/")[1];

  const slug = ["", "_next"].includes(urlSlug) ? "index" : urlSlug;

  const entry = await fetch(
    `${req.nextUrl.origin}/api/notion/shortener/get-url?slug=${slug}`
  ).then((res) => res.json());

  if (entry.url) {
    event.waitUntil(
      fetch(`${req.nextUrl.origin}/api/notion/shortener/add-click`, {
        method: "POST",
        body: JSON.stringify({ slug }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    return NextResponse.redirect(entry.url);
  }
};
