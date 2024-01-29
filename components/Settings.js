import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import Loader from "./Loader";
import { icons } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SetttingsAccountPage = ({ onUpdate }) => {
  const [checker, setChecker] = useState({
    profile: false,
    user: false,
    personalDetail: false,
    change: true,
  });
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  async function fetching() {
    let accountDetails = await axios.post(
      "https://annoncement-annocer-backend.vercel.app/Accountfind"
    );
    let accounts = await Object.values(accountDetails.data);
    setValues((previous) => ({
      ...previous,
      accounts: accounts,
    }));
  }
  const styles = StyleSheet.create({
    textInput: { paddingLeft: 10 },
    inputContainer: {
      width: "80%",
      height: 40,
      backgroundColor: "whitesmoke",
      borderRadius: 10,
      shadowColor: "black",
      elevation: 6,
      justifyContent: "center",
    },
    buttons: {
      flexDirection: "row",
      backgroundColor: "black",
      width: 200,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      shadowColor: "black",
      elevation: 10,
    },
    button: {
      color: "white",
      fontWeight: "900",
      fontSize: 15,
    },
    conform: {
      width: 130,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "black",
      elevation: 10,
    },
    parentTag: {
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "row",
      shadowColor: "black",
      elevation: 10,
      backgroundColor:
        checker.personalDetail || checker.user ? "lightgreen" : "cyan",
      borderRadius: 20,
      width: checker.personalDetail || checker.user ? "110%" : 250,
      height: checker.personalDetail || checker.user ? "60%" : 50,
    },
    personalDetailContainer: {
      paddingLeft: 10,
      flexDirection: "row",
      gap: 20,
    },
    personalDetailContainerText: {
      fontSize: 20,
    },
  });
  function handleSettings(item) {
    onUpdate(item);
  }
  async function handleRemoveAccount(id, index) {
    const updatedItems = [
      ...values.accounts.slice(0, index),
      ...values.accounts.slice(index + 1),
    ];
    setValues((previous) => ({ ...previous, accounts: updatedItems }));
    await axios.post(
      "https://annoncement-annocer-backend.vercel.app/DeleteAccount",
      {
        _id: id,
      }
    );
  }
  async function check() {
    const storedValue =
      (await AsyncStorage.getItem("@Annoncement:Annoncer")) || "null";
    setChecker((previous) => ({ ...previous, Account: storedValue }));
  }
  check();
  async function AddsuperUserConform(item) {
    let EmailAddress = values.Email?.split("@") || null;
    if (
      values.Email === undefined ||
      values.Name === undefined ||
      values.Password === undefined
    ) {
      setErrors((previous) => ({ ...previous, Form: "Enter valid Details" }));
    } else if (
      values.Email === "" ||
      values.Name === "" ||
      values.Password === ""
    ) {
      setErrors((previous) => ({
        ...previous,
        Form: "Don't Empty Details fill ",
      }));
    } else if (EmailAddress.length <= 1) {
      setErrors((previous) => ({
        ...previous,
        Form: "Enter Valid Gmail",
      }));
    } else if (EmailAddress.pop() === "gmail.com") {
      let response = await axios.post(
        "https://annoncement-annocer-backend.vercel.app/Account",
        {
          UserName: values.Name,
          Account: "SuperUser",
          Email: values.Email,
          Password: values.Password,
        }
      );
      if (response.data === "ok") {
        setChecker({ user: item });
      }
    } else {
      setErrors((previous) => ({
        ...previous,
        Form: "Not Valid Mail Address",
      }));
    }
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 30,
      }}
    >
      {checker.user && checker.Account === "Admin" ? (
        <View style={styles.parentTag}>
          <Text style={{ fontWeight: "900", fontSize: 30 }}>
            Add Super User
          </Text>
        </View>
      ) : !checker.user && !checker.personalDetail ? (
        <TouchableOpacity
          onPress={() =>
            setChecker((previous) => ({ ...previous, user: true }))
          }
          style={styles.parentTag}
        >
          <MaterialCommunityIcons
            name="account-multiple-plus"
            size={35}
            color="black"
          />
          <Text style={{ fontWeight: "900", fontSize: 20 }}>
            Add Super User
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {checker.personalDetail && checker.Account === "Admin" ? (
        <View style={[styles.parentTag, { marginTop: "100%" }]}>
          <Text style={{ fontWeight: "900", fontSize: 30 }}>
            Personal Details
          </Text>
        </View>
      ) : !checker.user && !checker.personalDetail ? (
        <View>
          <TouchableOpacity
            onPress={() => (
              setChecker((previous) => ({ ...previous, personalDetail: true })),
              fetching()
            )}
            style={styles.parentTag}
          >
            <MaterialCommunityIcons
              name="account-lock"
              size={35}
              color="black"
            />
            <Text style={{ fontWeight: "900", fontSize: 20 }}>
              Personal Details
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {(checker.user || checker.personalDetail) &&
      checker.Account !== "Admin" ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 30 }}
        >
          <Image
            style={{ height: 100, width: 100 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/900/900782.png",
            }}
          />
          <Text style={{ fontSize: 18, fontWeight: "700" }}>
            404 Entry Denied
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "700" }}>
            You're Not a Admin
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "900",
              textAlign: "center",
              color: "orangered",
            }}
          >
            Note:Admin only handle the Super User and more personalDetail
          </Text>
        </View>
      ) : checker.user ? (
        <View
          style={{
            top: "-20%",
            backgroundColor: "whitesmoke",
            minHeight: 400,
            width: 320,
            borderTopLeftRadius: 50,
            borderBottomRightRadius: 50,
            shadowColor: "green",
            elevation: 10,
            borderWidth: 1,
            borderColor: "lightgreen",
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setChecker((previous) => ({ ...previous, user: false }));
              setErrors((previous) => ({ ...previous, Form: undefined }));
            }}
            style={{ position: "absolute", top: -260, left: -50 }}
          >
            <AntDesign
              name="arrowleft"
              size={40}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </TouchableOpacity>
          <Text
            style={
             {
                    color: "brown",
                    fontWeight: "900",
                    fontSize: 18,
                    textAlign: "center",
                  }
            }
          >
           Note: The Super user only controll in Messages
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={values.Email === undefined ? "" : values.Email}
              onChangeText={(Text) =>
                setValues((previous) => ({ ...previous, Email: Text }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              value={values.Name === undefined ? "" : values.Name}
              onChangeText={(Text) =>
                setValues((previous) => ({ ...previous, Name: Text }))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              value={values.Password === undefined ? "" : values.Password}
              onChangeText={(Text) =>
                setValues((previous) => ({ ...previous, Password: Text }))
              }
            />
          </View>
          <Text style={{color:'red'}}>{errors.Form===undefined?"":errors.Form}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => AddsuperUserConform(false)}
              style={[styles.conform, { backgroundColor: "#a005e8" }]}
            >
              <Text style={styles.button}>Conform</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : checker.personalDetail ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            top: -130,
          }}
        >
          {values.accounts === undefined ? (
            <View
              style={{
                position: "absolute",
                top: "20%",
                backgroundColor: "witesmoke",
                width: 200,
                height: 40,
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader />
              <Text style={{ fontSize: 20, fontWeight: "900" }}>
                Loading...
              </Text>
            </View>
          ) : (
            <></>
          )}
          <FlatList
            horizontal
            style={{ margin: 10 }}
            data={values.accounts}
            renderItem={({ item, index }) => (
              <View
                id={`item${index}`}
                style={{
                  height: "55%",
                  width: 330,
                  marginLeft: 20,
                  backgroundColor: "white",
                  borderRadius: 25,
                  shadowColor: "black",
                  elevation: 10,
                  justifyContent: "flex-start",
                  gap: 20,
                  alignItems: "flex-start",
                }}
                key={`parent${index}`}
              >
                <View
                  style={{
                    top: 2,
                    left: 2,
                    padding: 10,
                  }}
                >
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    source={{
                      uri:
                        item.Account === "Admin"
                          ? "https://i.pinimg.com/564x/25/43/90/254390f7eecd9b51127e333ed12f0c1e.jpg"
                          : "https://i.pinimg.com/1200x/07/92/fc/0792fce6b64f2acfca56081729fde083.jpg",
                    }}
                  />
                </View>
                <MaterialIcons
                  name="account-circle"
                  size={100}
                  color="black"
                  style={{ alignSelf: "center" }}
                />
                <View style={styles.personalDetailContainer}>
                  <Text
                    style={[styles.personalDetailContainerText, { flex: 1 }]}
                  >
                    Account:
                  </Text>
                  <Text
                    style={[styles.personalDetailContainerText, { flex: 2 }]}
                    key={`firstchild${index}`}
                  >
                    {item.Account}
                  </Text>
                </View>
                <View style={styles.personalDetailContainer}>
                  <Text
                    style={[styles.personalDetailContainerText, { flex: 1 }]}
                  >
                    UserName:
                  </Text>
                  <Text
                    key={`thirdchild${index}`}
                    style={[styles.personalDetailContainerText, { flex: 2 }]}
                  >
                    {item.UserName}
                  </Text>
                </View>
                <View style={styles.personalDetailContainer}>
                  <Text
                    style={[styles.personalDetailContainerText, { flex: 1 }]}
                  >
                    Email:
                  </Text>
                  <Text
                    key={`fourthchild${index}`}
                    style={[
                      styles.personalDetailContainerText,
                      { flex: 2, fontSize: 16, fontWeight: "700" },
                    ]}
                  >
                    {item.Email}
                  </Text>
                </View>
                {item.Account === "Admin" ? (
                  <View
                    style={{
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      bottom: "8%",
                    }}
                  >
                    <Text style={{ color: "red" }}>
                      Note:Admin Account cannot be removable
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      alignSelf: "center",
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "50%",
                      position: "absolute",
                      bottom: "2%",
                      height: 40,
                      backgroundColor: "cyan",
                    }}
                    onPress={() => handleRemoveAccount(item._id, index)}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "900" }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />

          <TouchableOpacity
            onPress={() =>
              setChecker((previous) => ({
                ...previous,
                personalDetail: false,
                change: true,
              }))
            }
            style={{ position: "absolute", top: "-40%", left: "4%" }}
          >
            <AntDesign name="arrowleft" size={40} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {(!checker.user && !checker.personalDetail) ||
      checker.Account !== "Admin" ? (
        <TouchableOpacity
          onPress={() => handleSettings(false)}
          style={styles.buttons}
        >
          <Text style={{ fontSize: 18, color: "white", fontWeight: "900" }}>
            Back
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SetttingsAccountPage;
