import { useState, useEffect, useLayoutEffect } from "react";
import { ScrollView, View, Text, Button, StyleSheet } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import firebase from "../config/firebase";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Product from "../components/Product";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name="add"
          size={35}
          color="black"
          onPress={() => navigation.navigate("Add")}
        />
        //<Button title="Add" onPress={() => navig,ation.navigate("Add")} />
      ),
    });
  }, []);

  useEffect(() => {
    const collectionRef = collection(firebase.db, "products");
    const q = query(collectionRef, orderBy("createAt", "desc"));

    const unsuscribe = onSnapshot(q, querySnapshot => {
      setProducts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          emoji: doc.data().emoji,
          name: doc.data().name,
          price: doc.data().price,
          isSolid: doc.data().isSolid,
          createAt: doc.data().createAt,
        }))
      );
    });
    return unsuscribe;
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Products</Text>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3F9",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    margin: 16,
  },
});
