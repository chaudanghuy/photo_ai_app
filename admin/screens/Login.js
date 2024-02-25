import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

const Login = ({ navigation }) => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const { signIn } = useAuth();

     const handleLogin = async () => {
          try {
               await signIn(email, password);
          } catch (error) {
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