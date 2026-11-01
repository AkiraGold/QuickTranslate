import { AppShell, Box, Stack, Text } from '@mantine/core';
import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from "prismjs";
import 'prismjs/components/prism-markup';
import LanguageAccordion from '../Elements/LanguageAccordion';

const INPUT_PLACEHOLDER = `<string>Hello world</string>
<title>Welcome back</title>`;

function InputSection({ setSelectedLanguages, handleTranslate, selectedLanguages, inputXml, setInputXml, inputError }) {
  return (
    <AppShell.Section
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        paddingTop: "var(--app-shell-header-height, 60px)",
        boxSizing: "border-box",
      }}
    >
      <Stack display="flex" h="100%" direction="column">
        <Box
          flex={1}
          style={{
            overflow: "scroll",
            border: inputError
              ? "1px solid var(--mantine-color-red-6)"
              : "1px solid var(--mantine-color-default-border)",
            borderRadius: "20px"
          }}
        >
          <Editor
            value={inputXml}
            placeholder={INPUT_PLACEHOLDER}
            padding={20}
            onValueChange={e => setInputXml(e)}
            highlight={code => Prism.highlight(code, Prism.languages.markup)}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              // fontSize: "1rem",
              minHeight: "100%"
            }}
          />
        </Box>
        {inputError && (
          <Text c="red.6" size="sm" px="xs">
            {inputError}
          </Text>
        )}
        <LanguageAccordion
          handleTranslate={handleTranslate}
          setSelectedLanguages={setSelectedLanguages}
          selectedLanguages={selectedLanguages}
        />
      </Stack>
    </AppShell.Section>
  );
}

export default InputSection;
