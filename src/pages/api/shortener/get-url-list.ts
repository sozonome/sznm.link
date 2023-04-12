import type { NextApiRequest, NextApiResponse } from 'next';

import { getShortenerList } from 'lib/services/notion/link-shortener/getShortenerList';

const getUrlList = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Unallowed Method' });
  }

  const entry = await getShortenerList();
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=2678400');
  return res.status(200).json(entry);
};

export default getUrlList;
