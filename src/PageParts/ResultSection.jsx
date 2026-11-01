import { AppShell, Box, Button, Divider, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import Prism from "prismjs";
import 'prismjs/components/prism-markup';
import React, { useEffect, useRef, useState } from 'react';
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
    const [scrollbar, setScrollbar] = useState({ show: false, trackTop: 0, thumbTop: 0, thumbHeight: 0 });
    const panelRef = useRef(null);
    const backRef = useRef(null);

    const syncScrollbar = () => {
        const panel = panelRef.current;
        const back = backRef.current;
        if (!panel) return;

        const { scrollTop, scrollHeight, clientHeight } = panel;
        if (scrollHeight <= clientHeight + 1) {
            setScrollbar((current) => (current.show ? { ...current, show: false } : current));
            return;
        }

        const panelRect = panel.getBoundingClientRect();
        const backBottom = back
            ? back.getBoundingClientRect().bottom - panelRect.top
            : 100;
        const trackTop = Math.max(0, backBottom + 8);
        const trackHeight = Math.max(0, clientHeight - trackTop - 8);
        const thumbHeight = Math.min(
            trackHeight,
            Math.max(28, (clientHeight / scrollHeight) * trackHeight)
        );
        const maxOffset = Math.max(0, trackHeight - thumbHeight);
        const thumbTop = trackTop + (scrollTop / (scrollHeight - clientHeight)) * maxOffset;

        setScrollbar({
            show: trackHeight > 0,
            trackTop,
            thumbTop,
            thumbHeight,
        });
    };

    useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return undefined;

        syncScrollbar();
        const frame = requestAnimationFrame(syncScrollbar);
        const observer = new ResizeObserver(syncScrollbar);
        observer.observe(panel);
        if (backRef.current) observer.observe(backRef.current);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [translatedTexts, selectedLanguages, translateError, inputSection]);

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
                ref={panelRef}
                className="result-panel"
                onScroll={(event) => {
                    const scrolled = event.currentTarget.scrollTop > 4;
                    onPanelScroll?.(scrolled);
                    syncScrollbar();
                }}
            >
                <Stack className="result-content" align="stretch" gap="md" pb="md">
                    <Box ref={backRef} className="result-back">
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
            {scrollbar.show && (
                <Box
                    className="result-scrollbar"
                    aria-hidden
                    style={{ top: scrollbar.trackTop, bottom: 8 }}
                >
                    <Box
                        className="result-scrollbar-thumb"
                        style={{
                            top: scrollbar.thumbTop - scrollbar.trackTop,
                            height: scrollbar.thumbHeight,
                        }}
                    />
                </Box>
            )}
        </AppShell.Section>
    );
}

export default ResultSection;
