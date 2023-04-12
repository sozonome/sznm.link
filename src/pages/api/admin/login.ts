import { get } from '@vercel/edge-config';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { defaultHeader } from 'lib/constants/api/header';
import { AUTH_KEY_MATCHER, CLIENT_AUTH_KEY_MATCHER } from 'lib/constants/env';
import { slEncrypt } from 'lib/utils/slEncrypt';

export const config = {
  runtime: 'experimental-edge',
};

const editorLogin = async (req: NextRequest) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Invalid method' }), {
      status: 400,
      headers: defaultHeader,
    });
  }

  const { password } = await req.json();

  if (!password) {
    return new Response(JSON.stringify({ message: 'no password sent' }), {
      status: 400,
      headers: defaultHeader,
    });
  }

  const authKeyValue = await get(AUTH_KEY_MATCHER);
  const response = new NextResponse();

  if (password === authKeyValue) {
    response.cookies.set({
      name: CLIENT_AUTH_KEY_MATCHER,
      value: slEncrypt(password),
      maxAge: 3600,
    });
    return response;
  }

  return new Response(JSON.stringify({ message: 'Invalid password' }), {
    status: 400,
    headers: defaultHeader,
  });
};

export default editorLogin;
