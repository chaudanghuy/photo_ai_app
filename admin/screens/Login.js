import React, {useState} from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({navigation}) => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const apiUrl = process.env.API_URL;

     const handleLogin = async () => {
          try {
               const response = await axios.post("http://localhost:8080/api/v1/accounts/login", {
                    email: email,
                    password: password
               });

               if (response.data.token) {
                    AsyncStorage.setItem('token', response.data.token);
                    navigation.navigate("Homepage");
               } else {
                    console.log('Login failed');
               }
          } catch(error) {
               console.log(error);
          }
     }
     
     return (
          <View style={styles.container}>
               <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
               />
               <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
               />
               <Button
                    title="Login"
                    onPress={handleLogin}
               />
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
     },
     input: {
          width: '80%',
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
     },
});     

export default Login;