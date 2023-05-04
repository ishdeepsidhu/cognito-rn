import { NativeModules, Platform } from 'react-native';
export * from './amplify.config';
export * from './amplify.helpers';
export * from './amplify.helpers.types';

const LINKING_ERROR =
  `The package 'cognito-rn' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const CognitoRn = NativeModules.CognitoRn
  ? NativeModules.CognitoRn
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

function multiply(a: number, b: number): Promise<number> {
  return CognitoRn.multiply(a, b);
}
