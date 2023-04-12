// eslint-disable-next-line import/prefer-default-export
export { middleware } from 'lib/middleware';

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|manifest.json|robots.txt).*)'],
};
