import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import EmojiPicker from "rn-emoji-keyboard";

import { collection, addDoc } from "firebase/firestore";
import firebase from "../config/firebase";

export default function Add() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    emoji: "*",
    name: "",
    price: 0,
    isSold: false,
    createAt: new Date(),
  });

  const handleSaveProduct = async () => {
    try {
      await addDoc(collection(firebase.db, "products"), newItem);
      navigation.goBack()
    } catch (error) {
        alert(error.message);
    } 
  };

  const handlePick = (emojiObject) => {
    setNewItem({
      ...newItem,
      emoji: emojiObject.emoji,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell a New Product</Text>
      <Text style={styles.emoji} onPress={() => setIsOpen(true)}>
        {newItem.emoji}
      </Text>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Product Name"
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Price"
        onChangeText={(text) => setNewItem({ ...newItem, price: text })}
        keyboardType="number-pad"
      />
      <Button title="Save Product" onPress={handleSaveProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  inputContainer: {
    width: "90%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  emoji: {
    fontSize: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
});
