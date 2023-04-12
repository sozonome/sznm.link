/* eslint-disable consistent-return */
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { defaultHeader } from 'lib/constants/api/header';
import {
  adminAll,
  adminLogin,
  privateRoutes,
  restrictedRoutes,
} from 'lib/constants/routes';

import { authCheck } from './authCheck';

export const middleware = async (req: NextRequest, event: NextFetchEvent) => {
  if (restrictedRoutes.includes(req.nextUrl.pathname)) {
    const authorized = await authCheck(req);
    if (!authorized) {
      return;
    }
    return NextResponse.redirect(`${req.nextUrl.origin}${adminAll}`);
  }

  if (privateRoutes.includes(req.nextUrl.pathname)) {
    const authorized = await authCheck(req);
    if (authorized) {
      return;
    }
    return NextResponse.redirect(`${req.nextUrl.origin}${adminLogin}`);
  }

  const urlSlug = req.nextUrl.pathname.split('/')[1];
  const slug = urlSlug === '' ? 'index' : urlSlug;

  const entry = await fetch(
    `${req.nextUrl.origin}/api/shortener/get-url?slug=${slug}`
  ).then((res) => res.json());

  if (entry?.url) {
    event.waitUntil(
      fetch(`${req.nextUrl.origin}/api/shortener/add-click`, {
        method: 'POST',
        body: JSON.stringify({ slug }),
        headers: defaultHeader,
      })
    );
    return NextResponse.redirect(entry.url);
  }
};
