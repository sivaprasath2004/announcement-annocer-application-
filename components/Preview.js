import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import ColorPicker from "./colorPicker";
function Preview({ data, onUpdate }) {
  const [identies, setValue] = useState({ height: 200, width: 200 });
  const [checker, setChecker] = useState({ edit: false, color: false });
  const [selectedValue, setSelectedValue] = useState({ value: "null" });
  const [color, setColor] = useState({});
  function handleClick() {
    if (!checker.edit) {
      setChecker({ edit: !checker.edit });
    } else {
      setChecker({ edit: !checker.edit });
    }
  }
  function changeColor(item) {
    setColor((previous) => ({ ...previous, [selectedValue.value]: item }));
  }
  function EditColor(item) {
    if (item) {
      setChecker({ color: item });
    } else {
      onUpdate({ color, identies });
      setChecker({ color: item });
    }
  }
  return (
    <ScrollView
      style={{
        marginTop: 10,
        paddingLeft: 10,
        flexDirection: "column",
      }}
    >
      {checker.edit ? (
        <>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              borderWidth: 0.8,
              borderBottomColor: "black",
              borderRightColor: "transparent",
              borderTopColor: "transparent",
              borderLeftColor: "transparent",
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{ alignSelf: "center", fontSize: 18, fontWeight: "900" }}
              >
                Adjust
              </Text>
            </View>
            <View style={{ width: "50%", flexDirection: "column", gap: 20 }}>
              <Slider
                style={{ top: 15 }}
                value={identies.width}
                onValueChange={(newValue) =>
                  setValue((previous) => ({
                    ...previous,
                    width: newValue,
                    height: newValue,
                  }))
                }
                minimumValue={200}
                maximumValue={400}
                step={1}
              />
            </View>
            <TouchableOpacity
              onPress={handleClick}
              style={{
                height: 50,
                width: 80,
                justifyContent: "center",
                backgroundColor: "black",
                alignSelf: "center",
                borderRadius: 15,
              }}
            >
              <Text style={styles.Text}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => EditColor(true)} style={styles.button}>
          <Text style={styles.Text}>Edit Color</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => EditColor(false)}
          style={styles.button}
        >
          <Text style={styles.Text}>Save</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 28, fontWeight: "300", marginTop: 30 }}>
        {data.Subject === undefined ? "Enter Some One" : data.Subject}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "400",
          paddingTop: 20,
          marginTop: 30,
          color: color.Title === undefined ? "black" : color.Title,
        }}
      >
        {data.Title === undefined ? "Enter the Title" : data.Title}
      </Text>
      {data.image === "null" ? (
        <View
          style={{
            width: 150,
            backgroundColor: "black",
            marginTop: 50,
            marginLeft: 40,
            justifyContent: "center",
            alignItems: "center",
            height: 150,
            borderRadius: 10,
          }}
        >
          <Ionicons name="image" size={50} color="white" />
          <Text style={{ color: "white", fontWeight: "900" }}>
            Choose Image
          </Text>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Image
            style={{
              objectFit: "contain",
              width: identies.width === undefined ? 200 : identies.width,
              marginTop: 50,
              height: identies.width === undefined ? 200 : identies.width,
            }}
            alt="Image"
            source={{ uri: data.image }}
          />
          {!checker.edit ? (
            <TouchableOpacity
              onPress={handleClick}
              style={{
                backgroundColor: "black",
                marginRight: 20,
                width: 100,
                height: 40,
                justifyContent: "center",
              }}
            >
              <Text style={styles.text}>EDIT SIZE</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      )}
      <Text
        style={{
          marginTop: 50,
          fontWeight: "700",
          fontSize: 20,
          color: color.Content === undefined ? "black" : color.Content,
        }}
      >
        {data.Conetent === undefined ? "Enter Content" : data.Conetent}
      </Text>
      <Text
        style={{
          color: "blue",
          textDecorationColor: "blue",
          marginTop: 40,
          marginBottom: 50,
        }}
      >
        {data.Link === undefined ? "http:ThisExample.com" : data.Link}
      </Text>
      {checker.color ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setSelectedValue({ value: "Title" })}
              style={{
                backgroundColor: "transparent",
                height: 40,
                width: 120,
                justifyContent: "center",
                borderWidth: 2,
                borderRadius: selectedValue.value === "Title" ? 15 : 2,
                borderColor: color.Title === "null" ? "black" : color.Title,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: color.Title === undefined ? "black" : color.Title,
                  fontWeight: "900",
                }}
              >
                Title
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedValue({ value: "Content" })}
              style={{
                backgroundColor: "transparent",
                height: 40,
                width: 120,
                justifyContent: "center",
                borderWidth: 2,
                borderColor:
                  color.Content === undefined ? "black" : color.Content,
                borderRadius: selectedValue.value === "Content" ? 15 : 2,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: color.Content === undefined ? "black" : color.Content,
                  fontWeight: "900",
                }}
              >
                Content
              </Text>
            </TouchableOpacity>
          </View>
          <ColorPicker onUpdate={changeColor} />
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    height: 40,
    width: 120,
    borderRadius: 25,
    justifyContent: "center",
    shadowColor: "black",
    elevation: 10,
  },
  Text: { textAlign: "center", color: "white", fontWeight: "900" },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "900",
  },
});
export default Preview;
