/**
 *
 * @param str string / text to be chopped
 * @param qty number of char to be chopped from end
 * @returns chopped string
 */
export const chopStrFromEnd = (str: string, qty: number) =>
  str.substring(0, str.length - qty);
