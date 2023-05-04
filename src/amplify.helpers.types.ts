export type AmplifySignupType = {
    username: string;
    password: string;
    autoSignUpEnabled:boolean;
    attributes: {
        email: String|undefined|null;
        phone_number: String|undefined|null;
        given_name:String|undefined|null;
        family_name:String|undefined|null;
        name:String|undefined|null;
        "custom:userRole":String|undefined|null;
    }
}

export type AmplifyResendConfirmationCodeType = {
    username: string;
}

export type AmplifyConfirmSignupType = {
    username: string;
    code: string;
    forceAliasCreation:boolean;
}

export type AmplifyListenToAutoSignInEventType = {
    successCallback:(arg:Object) => void|undefined,
    errorCallback:(arg:String) => void|undefined
}

export type AmplifySignInType = {
    username: string;
    password: string;
}