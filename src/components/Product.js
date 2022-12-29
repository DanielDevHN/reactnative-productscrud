import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function Product({ id, emoji, name, price, isSold }) {
  const onEdit = async () => {
    try {
      const docRef = doc(firebase.db, "products", id);
      await updateDoc(docRef, {
        isSold: true
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onDelete = () => {
    const docRef = doc(firebase.db, "products", id)
    deleteDoc(docRef)
  }

  return (
    <View style={styles.productContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.emoji}>{emoji}</Text>
        <AntDesign name="delete" size={24} color="black" onPress={onDelete} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>$ {price}</Text>
      {isSold ? (
        <TouchableOpacity style={[styles.button, { backgroundColor: "gray" }]}>
          <Text style={styles.buttonText}>Purchase</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onEdit} style={styles.button}>
          <Text style={styles.buttonText}>Purchase</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
  },
  emoji: {
    fontSize: 100,
  },
  button: {
    backgroundColor: "#3486F6",
    padding: 8,
    marginVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
