import { chopStrFromEnd } from './chopStrFromEnd';

export const slEncrypt = (str: string) => {
  return chopStrFromEnd(btoa(str), 2);
};
