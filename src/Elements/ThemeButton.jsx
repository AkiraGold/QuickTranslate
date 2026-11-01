import { Button, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import React from 'react';

function ThemeButton() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  
    return (
        <Button
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        >
            Switch theme (temporary button placement)
        </Button>
    );
}

export default ThemeButton;