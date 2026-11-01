import { Button } from '@mantine/core';
import React from 'react';

function ExternalLinkIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
    );
}

function SiteLinkButton() {
    return (
        <Button
            component="a"
            href="https://virtualc.xyz"
            target="_blank"
            rel="noopener noreferrer"
            leftSection={<ExternalLinkIcon />}
        >
            Projects
        </Button>
    );
}

export default SiteLinkButton;
