import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const Logout = ({ onUpdate }) => {
  const navigation = useNavigation();
  const [clicked, setClicked] = useState(true);
  const handleLogout = () => {
    onUpdate("Logout", true);
  };
  const logout = async () => {
    await AsyncStorage.clear();
    setClicked(!clicked);
    onUpdate("Logout", true);
    navigation.navigate("Login");
  };
  return (
    <View
      style={{
        width: 300,
        height: 250,
        backgroundColor: "white",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        elevation: 10,
        gap: 20,
      }}
    >
      <View>
        <Text style={{ fontSize: 30, fontWeight: "900", color: "#121212" }}>
          Logout
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          flexDirection: "row",
        }}
      >
        <Entypo name="warning" size={24} color="brown" style={{ top: -16 }} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "orangered",
            fontWeight: "300",
            flex: 1,
          }}
        >
          Note:Please confirm your desire to log out by selecting the 'Logout'
          option.
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 20 }}>
        {clicked ? (
          <TouchableOpacity
            style={{
              width: 120,
              height: 40,
              backgroundColor: "#121212",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              shadowColor: "black",
              elevation: 10,
            }}
            onPress={logout}
          >
            <Text style={{ color: "white", fontWeight: "900", fontSize: 18 }}>
              Logout
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={{
            width: 120,
            height: 40,
            backgroundColor: "#121212",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            shadowColor: "black",
            elevation: 10,
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: "white", fontWeight: "900", fontSize: 18 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;
