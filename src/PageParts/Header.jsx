import { AppShell, Box, Center, Container, Image } from '@mantine/core';
import React from 'react';
import ThemeButton from '../Elements/ThemeButton';

function Header() {

    return (
        <AppShell.Header
            withBorder={false}
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
                    <ThemeButton />
                </Box>
            </Container>
        </AppShell.Header>
    );
}

export default Header;
