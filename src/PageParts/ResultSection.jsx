import { AppShell, Box, Button, Divider, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import Prism from "prismjs";
import 'prismjs/components/prism-markup';
import React, { useState } from 'react';
import BoxBase from '../Elements/BoxBase';
import Editor from 'react-simple-code-editor';
import { languageLabel } from '../constants/languages';
import './ResultSection.css';

function ResultSection({
    translatedTexts,
    switchSection,
    inputSection,
    selectedLanguages,
    translateError,
    onPanelScroll,
}) {
    const [copiedLanguage, setCopiedLanguage] = useState(null);

    const handleCopy = async (language, text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedLanguage(language);
            setTimeout(() => {
                setCopiedLanguage((current) => (current === language ? null : current));
            }, 1500);
        } catch (error) {
            console.error('Copy failed:', error);
        }
    };

    return (
        <AppShell.Section className="result-section">
            <Box
                className="result-panel"
                onScroll={(event) => {
                    const scrolled = event.currentTarget.scrollTop > 4;
                    onPanelScroll?.(scrolled);
                }}
            >
                <Stack className="result-content" align="stretch" gap="md" pb="md">
                    <Box className="result-back">
                        <Button
                            fullWidth
                            onClick={(e) => switchSection(!inputSection)}
                        >
                            Back
                        </Button>
                    </Box>
                    <BoxBase>
                        {translateError ? (
                            <Box m="md">
                                <Title mb="xs" order={2}>Translation failed</Title>
                                <Text c="dimmed" size="sm">{translateError}</Text>
                            </Box>
                        ) : translatedTexts[0] === undefined ? selectedLanguages.map((lang, index) => (
                            <Box key={lang}>
                                <Box m="md">
                                    <Title mb="xs" order={2}>{languageLabel(lang)}</Title>
                                    <Skeleton height={8} radius="xl" />
                                    <Skeleton height={8} mt={6} radius="xl" />
                                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                                </Box>
                                {index !== selectedLanguages.length - 1 && <Divider size="xs" color='dark.4' />}
                            </Box>
                        ))
                            :
                            translatedTexts.map((translation, index) => {
                                const value = translation.text.join('\n');
                                const isCopied = copiedLanguage === translation.language;
                                return (
                                <Box key={translation.language} className="result-language">
                                    <Box m="md">
                                        <Group justify="space-between" mb="xs" align="center">
                                            <Title order={2}>{languageLabel(translation.language)}</Title>
                                            <Button
                                                className="result-copy"
                                                size="xs"
                                                variant="light"
                                                data-copied={isCopied || undefined}
                                                onClick={() => handleCopy(translation.language, value)}
                                            >
                                                {isCopied ? 'Copied' : 'Copy'}
                                            </Button>
                                        </Group>
                                        <Editor
                                            value={value}
                                            onValueChange={() => {}}
                                            readOnly
                                            highlight={code => Prism.highlight(code, Prism.languages.markup)}
                                            style={{
                                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                                fontSize: 12,
                                            }}
                                        />
                                    </Box>
                                    {index !== translatedTexts.length - 1 && <Divider mt="md" size="xs" color='dark.4' />}
                                </Box>
                                );
                            })}
                    </BoxBase>
                </Stack>
            </Box>
        </AppShell.Section>
    );
}

export default ResultSection;