import type { APIGatewayProxyHandler } from 'aws-lambda';
import translate from 'google-translate-api-x';
import { findXmlTags, rebuildXmlTag } from '../../../src/constants/xmlTags';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Content-Type': 'application/json',
};

type TranslateBody = {
  text?: string;
  to?: string[];
};

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}') as TranslateBody;
    const toLanguages = body.to ?? [];
    const text = body.text ?? '';

    const translations: { language: string; text: string[] }[] = [];
    for (const lang of toLanguages) {
      const translatedTexts: string[] = [];
      for (const part of findXmlTags(text)) {
        const translatedText = await translate(part.inner, {
          to: lang,
          client: 'gtx',
        } as Parameters<typeof translate>[1]);
        translatedTexts.push(
          rebuildXmlTag({ ...part, inner: translatedText.text })
        );
      }
      translations.push({ language: lang, text: translatedTexts });
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(translations),
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Translation failed' }),
    };
  }
};
