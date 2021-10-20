
import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage)
        });
        }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
        if (user) {
        navigation.replace('Chat');
        } else {

            
            const register = ({navigation}) => {
                auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                user.updateProfile({
                displayName: name,
                photoURL: imageUrl ? imageUrl : "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
                }).catch(function (error) {
                alert(error.message)
                });
                navigation.popToTop();
                // ...
                })
                .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                });
                }
        // No user is signed in.
        }
        });
        return unsubscribe;
        }, [])

return (
<View style={styles.container}>
<Input
placeholder='EMAIL'
label='Email'
leftIcon={{ type: 'material', name: 'email' }}
value={email}
onChangeText={text => setEmail(text)}
/>
<Input
placeholder='PASSWORD'
label='Password'
leftIcon={{ type: 'material', name: 'lock' }}
value={password}
onChangeText={text => setPassword(text)}
secureTextEntry
/>
<Button title="sign in" style={styles.button} onPress={signIn} />
<Button title="register" style={styles.button} onPress={() => navigation.navigate('Register')} />
</View>
)
}
export default LoginScreen
const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    padding: 10
    },
    button: {
    width: 200,
    marginTop: 10
    }
    })