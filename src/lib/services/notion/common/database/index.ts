import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

import { notion } from 'lib/services/notion/client';

import type { NotionDatabaseEntries } from './types';

export const getDatabase = async (query: QueryDatabaseParameters) => {
  const response = await notion.databases.query(query);

  return response.results as NotionDatabaseEntries;
};
