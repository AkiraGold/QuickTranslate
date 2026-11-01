import React, { useEffect, useState } from 'react';
import { AppShell, Box } from '@mantine/core';
import Header from './PageParts/Header';
import ResultSection from './PageParts/ResultSection';
import InputSection from './PageParts/InputSection';
import 'prismjs/themes/prism-tomorrow.min.css';
import './AppViews.css';
import { post } from 'aws-amplify/api';
import { LANGUAGE_NAMES, languageNamesToCodes } from './constants/languages';
import { hasXmlTags } from './constants/xmlTags';

const SELECTED_LANGUAGES_KEY = 'quicktranslate.selectedLanguages';

function loadSelectedLanguages() {
  try {
    const raw = localStorage.getItem(SELECTED_LANGUAGES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((name) => LANGUAGE_NAMES.includes(name));
  } catch {
    return [];
  }
}

function App() {
  const [inputSection, switchSection] = useState(true);
  const [inputXml, setInputXml] = useState('');
  const [translatedTexts, setTranslatedTexts] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(loadSelectedLanguages);
  const [translateError, setTranslateError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    localStorage.setItem(SELECTED_LANGUAGES_KEY, JSON.stringify(selectedLanguages));
  }, [selectedLanguages]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape' || inputSection) return;
      setHeaderScrolled(false);
      switchSection(true);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [inputSection]);

  const handleTranslate = async () => {
    if (translating) return;
    if (!inputXml.trim()) {
      setInputError('Enter at least one XML entry to translate.');
      return;
    }
    if (!hasXmlTags(inputXml)) {
      setInputError('Input must include paired XML tags, e.g. <string>Hello</string>.');
      return;
    }

    setInputError(null);
    setTranslatedTexts([]);
    setTranslateError(null);
    setTranslating(true);
    switchSection(false);
    try {
      const restOperation = post({
        apiName: 'QuickTranslateAPI',
        path: '/translate',   
        options: {
            body: {
              text: inputXml,
              to: languageNamesToCodes(selectedLanguages),
            }
          }
      });
     
      const { body } = await restOperation.response;
      const response = await body.json();
      setTranslatedTexts(response);
    } catch (e) {
      console.error('Error fetching translation:', e);
      setTranslateError('Translation failed. The backend returned an error.');
    } finally {
      setTranslating(false);
    }
  }

  return (
    <AppShell
      header={{ height: 68 }}
      styles={{
        main: {
          paddingTop: 0,
        },
      }}
    >
      <Header scrolled={!inputSection && headerScrolled} />
      <AppShell.Main
        style={{
          minHeight: "100vh",
          maxHeight: "100vh",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box className="view-stage">
          <Box
            className="view-layer"
            data-active={inputSection ? 'true' : 'false'}
            data-direction={inputSection ? undefined : 'back'}
          >
            <InputSection
              setSelectedLanguages={setSelectedLanguages}
              handleTranslate={handleTranslate}
              selectedLanguages={selectedLanguages}
              inputXml={inputXml}
              setInputXml={(value) => {
                setInputXml(value);
                if (inputError) setInputError(null);
              }}
              inputError={inputError}
              translating={translating}
            />
          </Box>
          <Box
            className="view-layer"
            data-active={inputSection ? 'false' : 'true'}
          >
            <ResultSection
              translatedTexts={translatedTexts}
              switchSection={(next) => {
                setHeaderScrolled(false);
                switchSection(next);
              }}
              inputSection={inputSection}
              selectedLanguages={selectedLanguages}
              translateError={translateError}
              onPanelScroll={setHeaderScrolled}
            />
          </Box>
        </Box>
      </AppShell.Main>
      {/* <AppShell.Footer>
      https://dribbble.com/shots/22671301-Translator-App-Light-Dark-Accessibility
      https://dribbble.com/shots/18189658-Translate-App
      https://dribbble.com/shots/17464952-Google-Translate-Dark-Mode
      </AppShell.Footer> */}
    </AppShell>
  );
}

export default App;
