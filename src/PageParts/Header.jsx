import { AppShell, Box, Center, Container, Group, Image } from '@mantine/core';
import React from 'react';
import SiteLinkButton from '../Elements/SiteLinkButton';
import ThemeButton from '../Elements/ThemeButton';
import './Header.css';

function Header({ scrolled = false }) {

    return (
        <AppShell.Header
            withBorder={false}
            className={`app-header${scrolled ? ' app-header--scrolled' : ''}`}
        >
            <Container
                h="100%"
                size="xl"
                pos="relative"
            >
                <Center
                    pt="md"
                    pb="md"
                    h="100%"
                    inline
                    style={{
                        paddingInlineStart: "calc(var(--app-shell-navbar-offset, 0rem) + var(--app-shell-padding))",
                        paddingInlineEnd: "calc(var(--app-shell-aside-offset, 0rem) + var(--app-shell-padding))"
                    }}
                >
                    <Image
                        style={{
                            flex: "unset"
                        }}
                        h="100%"
                        src="/logo-no-background.svg"
                        alt="QuickTranslate logo"
                        className='logo'
                    />
                </Center>
                <Box
                    pos="absolute"
                    top="50%"
                    right="var(--mantine-spacing-md)"
                    style={{ transform: 'translateY(-50%)' }}
                >
                    <Group gap="xs">
                        <SiteLinkButton />
                        <ThemeButton />
                    </Group>
                </Box>
            </Container>
        </AppShell.Header>
    );
}

export default Header;
