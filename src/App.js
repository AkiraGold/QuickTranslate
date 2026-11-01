import React, { useState } from 'react';
import { AppShell, Box} from '@mantine/core';
import Header from './PageParts/Header';
import ResultSection from './PageParts/ResultSection';
import InputSection from './PageParts/InputSection';
import 'prismjs/themes/prism-tomorrow.min.css'; // Example style, you can use another
import { post } from 'aws-amplify/api';
import { languageNamesToCodes } from './constants/languages';
import { hasXmlTags } from './constants/xmlTags';

function App() {
  const [inputSection, switchSection] = useState(true);
  const [inputXml, setInputXml] = useState('');
  const [translatedTexts, setTranslatedTexts] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [translateError, setTranslateError] = useState(null);
  const [inputError, setInputError] = useState(null);

  const handleTranslate = async () => {
    if (!inputXml.trim()) {
      setInputError('Enter at least one XML entry to translate.');
      return;
    }
    if (!hasXmlTags(inputXml)) {
      setInputError('Input must include paired XML tags, e.g. <string>Hello</string>.');
      return;
    }

    setInputError(null);
    setTranslatedTexts([])
    setTranslateError(null)
    switchSection(!inputSection)
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
      console.log('POST call succeeded');
      console.log(response);

    } catch (e) {
      // console.log('POST call failed: ', JSON.parse(e.response.body));
      console.error('Error fetching translation:', e);
      setTranslateError('Translation failed. The backend returned an error.');
    }
  }

  return (
    <AppShell
      header={{ height: 60 }}
    // padding="md"
    >
      <Header />
      <AppShell.Main
        style={{
          minHeight: "100vh",
          maxHeight: "100vh",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              transition: "top 0.7s ease-in-out", // Define transition for the top property
              top: inputSection ? "0%" : "-100%",
            }}
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
            />
            <ResultSection
              translatedTexts={translatedTexts}
              switchSection={switchSection}
              inputSection={inputSection}
              selectedLanguages={selectedLanguages}
              translateError={translateError}
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
