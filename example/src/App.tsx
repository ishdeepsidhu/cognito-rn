import * as React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { ConfigureAmplify, AmplifySignIn } from 'cognito-rn';


ConfigureAmplify({
  userPoolId:"xxxxxxxxxxx",
  userPoolWebClientId:"xxxxxxxxxx",
  identityPoolId:"xxxxxxxxxxxxxxxxxxxxx",
  region:"xxxxxxxxxxxxxxxx",
  identityPoolRegion:"xxxxxxxxxxxxxxxxxx",
  authenticationFlowType:"USER_SRP_AUTH",
  clientMetadata:{},
  mandatorySignIn: false,
  MyStorage: undefined,
  signUpVerificationMethod:"code"
})




export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  const [userName, setUserName] = React.useState("Username");
  const [password, setPassword] = React.useState("Password");

  React.useEffect(() => {
    //multiply(3, 7).then(setResult);
  }, []);

  const onSubmitPress = async () => {
    try{
      console.log("value",userName,password);
      const user = await AmplifySignIn({username:userName,password:password});
      console.log("user",user.attributes);
      console.log("user sess",user.signInUserSession);
    } catch(err){
      console.log("cognito signin error",err);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput onChangeText={setUserName} value={userName}  />
      <TextInput onChangeText={setPassword} value={password} />
      <Button onPress={onSubmitPress} title='Login'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
