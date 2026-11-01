export const XML_TAG_PATTERN: RegExp;

export type XmlTagPart = {
  tag: string;
  attrs: string;
  inner: string;
};

export function hasXmlTags(text: string): boolean;
export function findXmlTags(text: string): XmlTagPart[];
export function rebuildXmlTag(part: XmlTagPart): string;
