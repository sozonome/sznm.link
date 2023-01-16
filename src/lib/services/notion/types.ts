/**
 * @note
 * adjusted from [@notion-stuff/v4-types](https://github.com/nartc/notion-stuff/blob/main/libs/v4-types/src/lib/types.ts)
 * to conform with @notionhq/client v2
 */

import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export declare type GetPagePropertyResponse =
  PageObjectResponse["properties"][string];
export declare type PropertyValueType = GetPagePropertyResponse["type"];
export declare type ExtractedPropertyValue<TType extends PropertyValueType> =
  Extract<
    GetPagePropertyResponse,
    {
      type: TType;
    }
  >;

export declare type PropertyValueRichText = ExtractedPropertyValue<"rich_text">;
export declare type PropertyValueNumber = ExtractedPropertyValue<"number">;
export declare type PropertyValueUrl = ExtractedPropertyValue<"url">;
