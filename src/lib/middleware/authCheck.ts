/* eslint-disable consistent-return */
import { get } from "@vercel/edge-config";
import type { NextRequest } from "next/server";

import { AUTH_KEY_MATCHER, CLIENT_AUTH_KEY_MATCHER } from "lib/constants/env";
import { slEncrypt } from "lib/utils/slEncrypt";

export const authCheck = async (req: NextRequest) => {
  const reqAuthKeyValue = req.cookies.get(CLIENT_AUTH_KEY_MATCHER)?.value;

  if (!reqAuthKeyValue) {
    return false;
  }

  const authKeyValue = await get(AUTH_KEY_MATCHER);

  return reqAuthKeyValue === slEncrypt(authKeyValue);
};
