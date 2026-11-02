import React from 'react';
import ReactDOM from 'react-dom/client';
import './mantineStyles';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ActionIcon, Button, Chip, Container, createTheme, MantineProvider } from '@mantine/core';
import { Amplify } from 'aws-amplify';
import { parseAmplifyConfig } from 'aws-amplify/utils';
import outputs from './amplify_outputs.json';

const amplifyConfig = parseAmplifyConfig(outputs);

Amplify.configure({
  ...amplifyConfig,
  API: {
    ...amplifyConfig.API,
    REST: outputs.custom?.API,
  },
});

const theme = createTheme({
  primaryColor: 'orange',
  defaultRadius: 'sm',
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: 'light',
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: 'light',
      },
    }),
    Chip: Chip.extend({
      defaultProps: {
        color: 'orange',
        variant: 'light',
        radius: 'sm',
        size: 'sm',
      },
    }),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Container size="xl">
        <App />
      </Container>
    </MantineProvider>
  </React.StrictMode>
);

reportWebVitals();
