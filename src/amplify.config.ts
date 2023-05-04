import { Amplify } from 'aws-amplify';

export const ConfigureAmplify = ({
    identityPoolId,
    region,
    identityPoolRegion,
    userPoolId,
    userPoolWebClientId,
    mandatorySignIn,
    signUpVerificationMethod,
    MyStorage,
    authenticationFlowType,
    clientMetadata
}:AmplifyConfigType) =>
Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: identityPoolId,

    // REQUIRED - Amazon Cognito Region
    region: region,

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: identityPoolRegion,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: userPoolId,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: userPoolWebClientId,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: mandatorySignIn,

    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    signUpVerificationMethod: signUpVerificationMethod, // 'code' | 'link'

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   domain: '.yourdomain.com',
    //   // OPTIONAL - Cookie path
    //   path: '/',
    //   // OPTIONAL - Cookie expiration in days
    //   expires: 365,
    //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //   sameSite: 'strict' | 'lax',
    //   // OPTIONAL - Cookie secure flag
    //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //   secure: true,
    // },

    // OPTIONAL - customized storage object
    storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: authenticationFlowType,

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    clientMetadata: clientMetadata,

    // OPTIONAL - Hosted UI configuration
    // oauth: {
    //   domain: 'your_cognito_domain',
    //   scope: [
    //     'phone',
    //     'email',
    //     'profile',
    //     'openid',
    //     'aws.cognito.signin.user.admin',
    //   ],
    //   redirectSignIn: 'http://localhost:3000/',
    //   redirectSignOut: 'http://localhost:3000/',
    //   responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    // },
  },
});

export type AmplifyConfigType = {
    identityPoolId:String;
    region:String;
    identityPoolRegion:String;
    userPoolId:String;
    userPoolWebClientId:String;
    mandatorySignIn:boolean;
    signUpVerificationMethod:'code' | 'link';
    MyStorage:null;
    authenticationFlowType:'USER_SRP_AUTH' | 'USER_PASSWORD_AUTH' | 'CUSTOM_AUTH';
    clientMetadata:Object|null;
}

// You can get the current config object
//const currentConfig = Auth.configure();