import { defineBackend } from '@aws-amplify/backend';
import { Stack } from 'aws-cdk-lib';
import {
  AuthorizationType,
  Cors,
  LambdaIntegration,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { translateFunction } from './functions/translate/resource';

const backend = defineBackend({
  translateFunction,
});

const apiStack = backend.createStack('api-stack');

const restApi = new RestApi(apiStack, 'RestApi', {
  restApiName: 'QuickTranslateAPI',
  deploy: true,
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: Cors.DEFAULT_HEADERS,
  },
});

const lambdaIntegration = new LambdaIntegration(
  backend.translateFunction.resources.lambda
);

const translatePath = restApi.root.addResource('translate');
translatePath.addMethod('POST', lambdaIntegration, {
  authorizationType: AuthorizationType.NONE,
});

backend.addOutput({
  custom: {
    API: {
      [restApi.restApiName]: {
        endpoint: restApi.url,
        region: Stack.of(restApi).region,
        apiName: restApi.restApiName,
      },
    },
  },
});
