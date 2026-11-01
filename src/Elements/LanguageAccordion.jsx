import { Accordion, Box, Button, Center, Grid, Group, Stack } from '@mantine/core';
import LanguageCheckbox from '../Elements/LanguageCheckbox';
import React from 'react';
import { LANGUAGE_NAMES } from '../constants/languages';

function LanguageAccordion({ handleTranslate, setSelectedLanguages, selectedLanguages }) {

    function AccordionControl(props) {
        return (
            <Center>
                <Accordion.Control {...props} />
                <Button
                    radius="0 19px 0 0"
                    style={{
                        minWidth: "fit-content",
                        height: "49px",
                    }}
                    disabled={selectedLanguages.length === 0}
                    onClick={handleTranslate}>Translate</Button>
            </Center>
        );
    }

    const handleLanguageCheckboxChange = (language) => {
        if (selectedLanguages.includes(language)) {
            setSelectedLanguages(selectedLanguages.filter(item => item !== language));
        } else {
            setSelectedLanguages([...selectedLanguages, language]);
        }
    };

    const handleCheckAllLanguages = () => {
        setSelectedLanguages([...LANGUAGE_NAMES]);
    };

    const handleUncheckAllLanguages = () => {
        setSelectedLanguages([]);
    };

    return (
        <Box
            pos="relative"
            w="100%"
        >
            <Accordion
                style={{
                    left: "0",
                    width: '100%',
                    borderRadius: "20px",
                    overflow: "hidden"
                }}
                mb="md"
                variant="contained"
                chevronPosition="left"
            >
                <Accordion.Item
                    style={{
                        borderRadius: "20px"
                    }}
                    value="item">
                    <AccordionControl>
                        Select languages
                    </AccordionControl>
                    <Accordion.Panel>
                        <Stack
                            align="stretch"
                            justify="center"
                            gap="xl"
                        >
                            <Grid grow>
                                {LANGUAGE_NAMES.map(language => (
                                    <Grid.Col key={language} span={{ base: 6, sm: 4, md: 3, lg: 2 }}>
                                        <LanguageCheckbox
                                            language={language}
                                            checked={selectedLanguages.includes(language)}
                                            onChange={() => handleLanguageCheckboxChange(language)}
                                        />
                                    </Grid.Col>
                                ))}
                            </Grid>
                            <Center>
                                <Group justify="center">
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
