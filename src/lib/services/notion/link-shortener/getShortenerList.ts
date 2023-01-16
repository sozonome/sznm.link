import { getDatabase } from "lib/services/notion/common/database";
import { NOTION_LINK_SHORTENER_DATABASE_ID } from "lib/services/notion/constants";
import type {
  PropertyValueNumber,
  PropertyValueRichText,
  PropertyValueUrl,
} from "lib/services/notion/types";

import type { ShortenedUrlEntry } from "./types";

export const getShortenerList = async (): Promise<
  Array<Partial<ShortenedUrlEntry>>
> => {
  const result = await getDatabase({
    database_id: NOTION_LINK_SHORTENER_DATABASE_ID,
  });

  return result.map((entry) => ({
    id: entry?.id,
    slug:
      (entry?.properties.slug as PropertyValueRichText).rich_text[0]
        ?.plain_text ?? "",
    url: (entry?.properties.url as PropertyValueUrl)?.url ?? "",
    clicks: (entry?.properties.clicks as PropertyValueNumber)?.number ?? 0,
  }));
};
