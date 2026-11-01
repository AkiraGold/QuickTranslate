import { Button } from '@mantine/core';
import React from 'react';

function SiteLinkButton() {
    return (
        <Button
            component="a"
            href="https://virtualc.xyz"
            target="_blank"
            rel="noopener noreferrer"
        >
            Projects
        </Button>
    );
}

export default SiteLinkButton;
