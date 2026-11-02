import { Accordion, Box, Button, Center, Chip, Group, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { LANGUAGE_NAMES } from '../constants/languages';

function selectionSummary(selectedLanguages) {
    if (selectedLanguages.length === 0) {
        return 'Select languages';
    }
    if (selectedLanguages.length <= 3) {
        return selectedLanguages.join(', ');
    }
    const shown = selectedLanguages.slice(0, 2).join(', ');
    return `${shown} +${selectedLanguages.length - 2}`;
}

function LanguageAccordion({ handleTranslate, setSelectedLanguages, selectedLanguages, translating = false }) {
    const [opened, setOpened] = useState(null);

    const isOpen = opened === 'item';

    function AccordionControl(props) {
        return (
            <Center
                style={{
                    alignItems: 'stretch',
                }}
            >
                <Accordion.Control
                    {...props}
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        minHeight: 49,
                        // Bleed into item border so hover fill isn’t inset
                        margin: '-1px 0 -1px -1px',
                        borderRadius: isOpen ? '20px 0 0 0' : '20px 0 0 20px',
                    }}
                />
                <Button
                    radius={isOpen ? '0 20px 0 0' : '0 20px 20px 0'}
                    style={{
                        minWidth: 'fit-content',
                        alignSelf: 'stretch',
                        minHeight: 49,
                        margin: '-1px -1px -1px 0',
                    }}
                    disabled={selectedLanguages.length === 0 || translating}
                    loading={translating}
                    onClick={handleTranslate}
                >
                    Translate
                </Button>
            </Center>
        );
    }

    const handleCheckAllLanguages = () => {
        setSelectedLanguages([...LANGUAGE_NAMES]);
    };

    const handleUncheckAllLanguages = () => {
        setSelectedLanguages([]);
    };

    const summary = selectionSummary(selectedLanguages);

    return (
        <Box
            pos="relative"
            w="100%"
        >
            <Accordion
                value={opened}
                onChange={setOpened}
                style={{
                    left: "0",
                    width: '100%',
                    borderRadius: "20px",
                    overflow: "hidden",
                }}
                styles={{
                    item: {
                        '--item-filled-color': 'transparent',
                    },
                    control: {
                        borderRadius: isOpen ? '20px 0 0 0' : '20px 0 0 20px',
                    },
                    content: {
                        padding: 'var(--mantine-spacing-sm)',
                        paddingTop: 'var(--mantine-spacing-xs)',
                    },
                }}
                variant="contained"
                chevronPosition="left"
            >
                <Accordion.Item
                    style={{
                        borderRadius: "20px",
                    }}
                    value="item">
                    <AccordionControl>
                        <Group gap="xs" wrap="nowrap" justify="space-between" pr="xs">
                            <Text size="sm" truncate>
                                {summary}
                            </Text>
                            <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
                                {selectedLanguages.length === 0
                                    ? 'click to pick'
                                    : 'click to change'}
                            </Text>
                        </Group>
                    </AccordionControl>
                    <Accordion.Panel>
                        <Stack
                            align="stretch"
                            justify="center"
                            gap="sm"
                        >
                            <Chip.Group
                                multiple
                                value={selectedLanguages}
                                onChange={setSelectedLanguages}
                            >
                                <Group gap="xs">
                                    {LANGUAGE_NAMES.map(language => (
                                        <Chip key={language} value={language}>
                                            {language}
                                        </Chip>
                                    ))}
                                </Group>
                            </Chip.Group>
                            <Center>
                                <Group justify="center" gap="xs">
                                    <Button
                                        onClick={handleCheckAllLanguages}
                                    >
                                        Check All
                                    </Button>
                                    <Button
                                        onClick={handleUncheckAllLanguages}
                                    >
                                        Uncheck All
                                    </Button>
                                </Group>
                            </Center>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Box>
    );
}

export default LanguageAccordion;
