import { Box } from '@mantine/core';
import React from 'react';

function BoxBase({ children, style, ...props }) {
    return (
        <Box
            style={{ 
                borderRadius: "20px",
                border: "1px solid var(--mantine-color-default-border)",
                ...style,
            }}
            {...props}
        >
            {children}
        </Box>
    );
}

export default BoxBase;
