// @refresh reset
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./config/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  // const chatsRef = collection(db, "chats");

  async function readUser() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }

  async function handlePress() {
    const _id = Math.random().toString(36).substring(7);
    const user = { _id, name };
    await AsyncStorage.setItem(
      "user",
      JSON.stringify("user", JSON.stringify(user))
    );
    setUser(user);
  }

  useEffect(() => {
    readUser();
    // const unsubscribe = getDocs(chatsRef).then((snapshot) => {
    //   let collection = [];
    //   snapshot.docs.forEach((doc) => {
    //     collection.push({
    //       ...doc.data(),
    //       // createdAt: doc.data().createdAt.toDate(),
    //       id: doc.id,
    //     });
    //   });
      // collection.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      // setMessages(collection);
    // });
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Button title="Enter the chat" onPress={handlePress} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Comfort</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    marginBottom: 20,
  },
});
