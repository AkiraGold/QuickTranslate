import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@mantine/core/styles.css';
import { ActionIcon, Button, Checkbox, Chip, Container, createTheme, MantineProvider } from '@mantine/core';
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
    Checkbox: Checkbox.extend({
      defaultProps: {
        color: 'orange',
        radius: 'sm',
      },
      vars: () => ({
        root: {
          '--checkbox-color': 'var(--mantine-color-orange-light)',
          '--checkbox-icon-color': 'var(--mantine-color-orange-light-color)',
        },
      }),
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
