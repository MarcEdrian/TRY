
import { auth,db } from '../firebase'
import React,{useCallback, useState,useLayoutEffect, useEffect}  from 'react'
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = ({ navigation}) => {
    const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello FLEX INC.',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/444/159/any',
//         },
//       },
//     ])
//   }, [])
useLayoutEffect(() => {
    const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
    snapshot.docs.map(doc => ({
    _id: doc.data()._id,
    createdAt: doc.data().createdAt.toDate(),
    text: doc.data().text,
    user: doc.data().user,
    }))
    ));
    return unsubscribe;
    }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
        _id,
        createdAt,
        text,
        user,
        } = messages[0] 
        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user
            })
            
  }, [])


    // const [messages, setMessages] = useState([]);
    // const signOut = () => {
    useLayoutEffect(() => {
     navigation.setOptions({
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
            <Avatar
            rounded
            source={{
            uri: auth?.currentUser?.photoURL,
            }}
            />
            </View>
            ),
         headerRight: () => (
             <TouchableOpacity style={{marginRight: 10}} onPress={signOut}>
            <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
           )  
        } )

    }, [])

    const signOut = () => {
      auth.signOut().then(() => {
        // Sign-out successful.
        navigation.replace("Login");
        }).catch((error) => {
        // An error happened.
        });
        }


    return (
        <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL
        }}
    />
    )
}

export default ChatScreen
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
