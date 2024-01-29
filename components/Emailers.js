import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const Emailers = ({ onUpdate }) => {
  const [value, setValues] = useState({ loading: 0, data: "null" });
  useEffect(() => {
    const api = async () => {
      let response = await axios.get(
        "https://annoncement-annocer-backend.vercel.app/All",
        {
          params: { category: "College", value: "EASC" },
        }
      );
      let value = await Object.values(response.data);
      setValues((previous) => ({ ...previous, data: value }));
    };
    api();
  }, []);

  function handleBack() {
    onUpdate("Emailers", true);
  }
  return (
    <>
      <View>
        {value.data !== "null" ? (
          <>
            <FlatList
              style={{ margin: 10 }}
              data={value.data}
              renderItem={({ item, index }) => (
                <View style={{ flexDirection: "row", margin: 20 }}>
                  <View style={{ flex: 1 }}>
                    <Text>{index + 1}</Text>
                  </View>
                  <View style={{ width: "90%", flexDirection: "row", gap: 20 }}>
                    <Text>{item.Reg_no}</Text>
                    <Text>{item.Email}</Text>
                  </View>
                </View>
              )}
            />
            <View
              style={{
                backgroundColor: "white",
                borderWidth: 0.1,
                flexDirection: "row",
                alignItems: "center",
                minWidth: 60,
                position: "absolute",
                zIndex: 2,
                shadowColor: "black",
                elevation: 5,
                top: 0,
                gap: 8,
                padding: 3,
                right: 15,
                borderRadius: 15,
                justifyContent: "space-evenly",
              }}
            >
              <AntDesign name="user" size={20} color="black" />
              <Text
                style={{ fontWeight: "500", fontSize: 18, paddingRight: 10 }}
              >
                {value.data.length}
              </Text>
            </View>
          </>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              flexDirection: "row",
              right: "10%",
              gap: 20,
            }}
          >
            <Loader />
            <Text style={{ fontSize: 20, fontWeight: "900" }}>Loading..</Text>
          </View>
        )}
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleBack()}
          style={{
            width: "40%",
            margin: 10,
            height: 40,
            backgroundColor: "black",
            borderRadius: 25,
            shadowColor: "black",
            elevation: 6,
            justifyContent: "center",
          }}
        >
          <Text style={styles.Text}>BACK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  Text: {
    textAlign: "center",
    fontWeight: "900",
    color: "white",
  },
});
export default Emailers;
