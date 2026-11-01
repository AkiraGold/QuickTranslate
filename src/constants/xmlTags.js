/** Paired XML-ish tags: <tag attrs>inner</tag> */
export const XML_TAG_PATTERN = /<([^>\s]+)([^>]*)>(.*?)<\/\1>/;

export function hasXmlTags(text) {
  return XML_TAG_PATTERN.test(text);
}

/**
 * Find all paired tags in `text`.
 * Returns { tag, attrs, inner } for each match.
 */
export function findXmlTags(text) {
  const regex = /<([^>\s]+)([^>]*)>(.*?)<\/\1>/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push({
      tag: match[1],
      attrs: match[2],
      inner: match[3],
    });
  }
  return matches;
}

export function rebuildXmlTag({ tag, attrs, inner }) {
  return `<${tag}${attrs}>${inner}</${tag}>`;
}
