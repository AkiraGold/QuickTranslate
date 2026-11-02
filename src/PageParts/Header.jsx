import { AppShell, Container, Group, Image } from '@mantine/core';
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
                px="md"
            >
                <Group
                    h="100%"
                    justify="space-between"
                    wrap="nowrap"
                    gap="sm"
                >
                    <div className="app-header-logo">
                        <Image
                            src="/logo-no-background.svg"
                            alt="QuickTranslate logo"
                            className="logo"
                        />
                    </div>
                    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                        <SiteLinkButton />
                        <ThemeButton />
                    </Group>
                </Group>
            </Container>
        </AppShell.Header>
    );
}

export default Header;
