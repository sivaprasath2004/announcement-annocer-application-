import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Settingsprivacy = ({ onUpdate }) => {
  const [values, setValues] = useState({
    changepassword: false,
    forgotpassword: false,
    menu: true,
  });

  const [inputValues, setInputValues] = useState({});
  const styles = StyleSheet.create({
    buttonText: { fontSize: 20, fontWeight: "900", color: "white" },
    menuButton: {
      fontSize: values.changepassword || values.forgotpassword ? 30 : 20,
      fontWeight: "900",
      color: "#121212",
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        !values.changepassword && !values.forgotpassword
          ? "cyan"
          : values.changepassword || values.forgotpassword
          ? "lightgreen"
          : "cyan",
      borderRadius: 20,
      width: values.changepassword || values.forgotpassword ? 500 : 250,
      height: values.changepassword || values.forgotpassword ? "60%" : 50,
    },
    inputContainer: {
      backgroundColor: "whitesmoke",
      width: "80%",
      height: 50,
      justifyContent: "center",
      borderRadius: 13,
      elevation: 5,
    },
    inputBox: { fontSize: 18, paddingLeft: 10 },
  });
  function handleHomePage(item) {
    console.log(item);
    onUpdate(item);
  }
  async function updatePassword() {
    const id = (await AsyncStorage.getItem("Annoncement:Annoncer")) || "null";
    if (values.changepassword) {
      if (
        inputValues.current_password !== undefined &&
        inputValues.New_password !== undefined &&
        inputValues.Re_password !== undefined
      ) {
        let response = await axios.post(
          "https://annoncement-annocer-backend.vercel.app/Password",
          {
            category: "_id",
            value: id,
            pass: inputValues.current_password,
            New: inputValues.New_password,
          }
        );
        {
          response.data === "ok"
            ? (setValues((previous) => ({
                ...previous,
                forgotpassword: false,
                changepassword: false,
                Error: undefined,
              })),
              setInputValues({}))
            : setValues((previous) => ({
                ...previous,
                Error: response.data,
              }));
        }
      }
    } else {
      if (
        inputValues.Email_ID !== undefined &&
        inputValues.UserName !== undefined &&
        inputValues.New_password !== undefined &&
        inputValues.Re_password !== undefined
      ) {
        if (
          inputValues.Email_ID.split("@").pop() === "gmail.com" &&
          inputValues.New_password === inputValues.Re_password
        ) {
          let response = await axios.post(
            "https://annoncement-annocer-backend.vercel.app/Password",
            {
              category: "Email",
              value: inputValues.Email_ID,
              UserName: inputValues.UserName,
              pass: inputValues.New_password,
            }
          );
          {
            response.data === "ok"
              ? (setValues((previous) => ({
                  ...previous,
                  forgotpassword: false,
                  changepassword: false,
                  Error: undefined,
                })),
                setInputValues({}))
              : setValues((previous) => ({
                  ...previous,
                  Error: response.data,
                }));
          }
        } else {
          setValues((previous) => ({
            ...previous,
            Error: "Email id or password not match",
          }));
        }
      }
    }
  }
  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
        <View
          style={{ gap: 30, justifyContent: "center", alignItems: "center" }}
        >
          {values.forgotpassword ? (
            <></>
          ) : values.changepassword ? (
            <View style={styles.button}>
              <Text style={styles.menuButton}>Change Password</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.button, { shadowColor: "black", elevation: 10 }]}
              onPress={() =>
                setValues((previous) => ({ ...previous, changepassword: true }))
              }
            >
              <Text style={styles.menuButton}>Change Password</Text>
            </TouchableOpacity>
          )}
          {values.changepassword ? (
            <></>
          ) : values.forgotpassword ? (
            <View style={styles.button}>
              <Text style={styles.menuButton}>Forgot Password</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.button, { shadowColor: "black", elevation: 10 }]}
              onPress={() =>
                setValues((previous) => ({ ...previous, forgotpassword: true }))
              }
            >
              <Text style={styles.menuButton}>Forgot Password</Text>
            </TouchableOpacity>
          )}

          <></>
          {values.changepassword || values.forgotpassword ? (
            <View
              style={{
                backgroundColor: "white",
                width: 400,
                top: -200,
                minHeight: 500,
                borderColor: "lightgreen",
                borderWidth: 0.5,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                gap: 30,
                shadowColor: "brown",
                elevation: 15,
              }}
            >
              {values.changepassword ? (
                <View style={styles.inputContainer}>
                  <TextInput
                    value={
                      inputValues.current_password === undefined
                        ? ""
                        : inputValues.current_password
                    }
                    onChangeText={(text) =>
                      setInputValues((previous) => ({
                        ...previous,
                        current_password: text,
                      }))
                    }
                    style={styles.inputBox}
                    placeholder="Current Password"
                  />
                </View>
              ) : values.forgotpassword ? (
                <>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputBox}
                      value={
                        inputValues.Email_ID === undefined
                          ? ""
                          : inputValues.Email_ID
                      }
                      onChangeText={(text) =>
                        setInputValues((previous) => ({
                          ...previous,
                          Email_ID: text,
                        }))
                      }
                      placeholder="Email Id"
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputBox}
                      value={
                        inputValues.UserName === undefined
                          ? ""
                          : inputValues.UserName
                      }
                      onChangeText={(text) =>
                        setInputValues((previous) => ({
                          ...previous,
                          UserName: text,
                        }))
                      }
                      placeholder="UserName"
                    />
                  </View>
                </>
              ) : (
                <></>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputBox}
                  value={
                    inputValues.New_password === undefined
                      ? ""
                      : inputValues.New_password
                  }
                  onChangeText={(text) =>
                    setInputValues((previous) => ({
                      ...previous,
                      New_password: text,
                    }))
                  }
                  placeholder="New Password"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputBox}
                  value={
                    inputValues.Re_password === undefined
                      ? ""
                      : inputValues.Re_password
                  }
                  onChangeText={(text) =>
                    setInputValues((previous) => ({
                      ...previous,
                      Re_password: text,
                    }))
                  }
                  placeholder="Re-Enter Password"
                />
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "lightgreen",
                    fontWeight: "900",
                    fontSize: 18,
                  }}
                >
                  {values.Error === undefined
                    ? "Enter Correct Information"
                    : values.Error}
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    height: 50,
                    width: "50%",
                    backgroundColor: "black",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "black",
                    elevation: 10,
                  }}
                  onPress={() => updatePassword()}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        {values.changepassword || values.forgotpassword ? (
          <TouchableOpacity
            style={{ position: "absolute", top: 60, left: 50 }}
            onPress={
              !values.changepassword && !values.forgotpassword
                ? () => handleHomePage(false)
                : () => {
                    setValues((previous) => ({
                      ...previous,
                      forgotpassword: false,
                      changepassword: false,
                    }));
                    setInputValues({});
                  }
            }
          >
            <AntDesign name="arrowleft" size={38} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              height: 50,
              width: 150,
              backgroundColor: "black",
              borderRadius: 20,
              justifyContent: "center",
              shadowColor: "black",
              elevation:
                values.changepassword || values.forgotpassword ? 20 : 10,
              position:
                values.changepassword || values.forgotpassword
                  ? "absolute"
                  : "relative",

              alignItems: "center",
              top: values.changepassword || values.forgotpassword ? 60 : 0,
              left: values.changepassword || values.forgotpassword ? 40 : 0,
            }}
            onPress={
              !values.changepassword && !values.forgotpassword
                ? () => handleHomePage(false)
                : () =>
                    setValues((previous) => ({
                      ...previous,
                      forgotpassword: false,
                      changepassword: false,
                    }))
            }
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Settingsprivacy;
