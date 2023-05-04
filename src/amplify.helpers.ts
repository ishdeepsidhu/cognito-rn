import { Auth, Hub } from 'aws-amplify';
import type {
  AmplifyConfirmSignupType,
  AmplifyListenToAutoSignInEventType,
  AmplifyResendConfirmationCodeType,
  AmplifySignInType,
  AmplifySignupType,
} from './amplify.helpers.types';

export async function AmplifySignup({
  username,
  password,
  attributes,
  autoSignUpEnabled,
}: AmplifySignupType) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: attributes,
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: autoSignUpEnabled,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log('error signing up:', error);
    throw error;
  }
}

export async function AmplifyResendConfirmationCode({
  username,
}: AmplifyResendConfirmationCodeType): Promise<boolean> {
  try {
    await Auth.resendSignUp(username);
    return true;
    //console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
    throw err;
  }
}

export async function AmplifyConfirmSignUp({
  username,
  code,
  forceAliasCreation,
}: AmplifyConfirmSignupType): Promise<boolean> {
  try {
    await Auth.confirmSignUp(username, code, {
      forceAliasCreation: forceAliasCreation,
    });
    return true;
  } catch (error) {
    console.log('error confirming sign up', error);
    throw error;
  }
}

export function AmplifyListenToAutoSignInEvent({
  successCallback,
  errorCallback,
}: AmplifyListenToAutoSignInEventType) {
  Hub.listen('auth', ({ payload }) => {
    const { event } = payload;
    if (event === 'autoSignIn') {
      const user = payload.data;
      if (typeof successCallback === 'function') {
        successCallback(user);
      }
      // assign user
    } else if (event === 'autoSignIn_failure') {
      // redirect to sign in page
      if (typeof errorCallback === 'function') {
        errorCallback(event);
      }
    }
  });
}

export async function AmplifySignIn({ username, password }: AmplifySignInType) {
  try {
    console.log('gt alues', username, password);
    const user = await Auth.signIn({ username, password });
    return user;
  } catch (error) {
    console.log('error signing in', error);
    throw error;
  }
}

export async function AmplifySignOut() {
  try {
    await Auth.signOut();
    return true;
  } catch (error) {
    console.log('error signing out: ', error);
    throw error;
  }
}
