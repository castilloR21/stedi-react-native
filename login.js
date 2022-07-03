import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import {Text, TouchableOpacity, View } from "react-native";


const sendText= async (phoneNumber)=>{
  console.log("PhoneNumber: ", phoneNumber);
  await fetch('https://dev.stedi.me/twofactorlogin/'+ phoneNumber, {
    method: 'POST',
    headers: {
      'content-type': 'application/text'
    }
  });

}

const getToken = async ({phoneNumber, oneTimePassword, setUserLoggedIn}) => {
  setUserLoggedIn(true)

  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin', {
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers: {
      'content-type':'application/json'
    }
  });

  const responseCode = tokenResponse.status;
  console.log("Response Status Code", responseCode);
  if (responseCode == 200){
    setUserLoggedIn(true);
  }

  const tokenResponseString = await tokenResponse.text();
  

}



const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);
  // const [count, setCount] = useState(0);
  // const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder = "314-555-6234"
        placeholderTextColor = '#4251f5'

      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber);}}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>


      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor = '#4251F5'
        keyboardType="numeric"
        secureTextEntry = {true}
      />
       
       

      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn});
      }}
      >
        <Text>Login</Text>
      </TouchableOpacity>


    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
    marginTop:100
  }
  ,
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }

});

export default Login;