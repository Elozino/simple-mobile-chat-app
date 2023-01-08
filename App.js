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
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";

export default function App() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  const chatsRef = collection(db, "chats");

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
    // listen to real time changes
    const unsubscribe = onSnapshot(chatsRef, (snapshot) => {
      const messagesFirestore = snapshot
        .docChanges()
        .filter(({ type }) => {
          type == "added";
        })
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt().getTime());
      setMessages(messagesFirestore);
    });
  }, []);

  async function handleSend(messages) {
    const writes = messages.map((m) => addDoc(chatsRef, m));
    await Promise.all(writes);
  }

  if (JSON.stringify(user) === "{}") {
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
    <>
      <GiftedChat messages={messages} user={user} onSend={handleSend} />
      <StatusBar style="auto" />
    </>
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
