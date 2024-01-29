import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { gender, batch, degree, course, department } from "../constants/dummy";
import { useState } from "react";
import axios from "axios";
const AddUser = ({ onUpdate,data }) => {
  const [value, setValue] = useState({
    Gender: undefined,
    Batch: undefined,
    Degree: undefined,
    Course: undefined,
    Department: undefined,
  });
  const [message, setMessage] = useState();
  function handleBack() {
    onUpdate("addreceiver", true);
  }
  function save() {
    let check;
    if (
      (value.Batch &&
        value.Email &&
        value.College &&
        value.Degree &&
        value.name &&
        value.Reg_no &&
        value.Gender &&
        value.Course &&
        value.Department) !== undefined
    ) {
      check = value.Email.split("@") || ["null"];
      if (
        value.Gender !== "Gender" &&
        value.Batch !== "Batch" &&
        value.Course !== "Course" &&
        value.Degree !== "Degree" &&
        value.Department !== "Department"
      ) {
        if (
          check.length == 2 &&
          (check[1] === "gmail.com" || check[1] === "outlook.com")
        ) {
          setMessage(false);
          handleBack()
          console.log(value);
          axios
            .post("https://annoncement-annocer-backend.vercel.app/createUser", {
              value,
            })
            .then((res) => console.log(res.data));
        } else {
          setMessage("Email Not valid");
        }
      } else {
        setMessage("Fill the form");
      }
    } else {
      setMessage("Fill the form");
    }
  }
  return (
    <View
      style={{
        position: "absolute",
        margin: 10,
        height:data==='login'?"70": "90%",
        zIndex: 5,
        width: "90%",
        shadowColor: "black",
        elevation: 45,
        borderRadius: 15,
        backgroundColor: "wheat",
        alignItems:'center',justifyContent:'center'
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          backgroundColor: "wheat",
          borderRadius: 100,
          top: -30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="account-circle" size={60} color="black" />
      </View>
      <View style={style.container}>
        <TextInput
          placeholder="College"
          onChangeText={(text) =>
            setValue((prevValues) => ({ ...prevValues, College: text }))
          }
          style={style.InputBox}
        ></TextInput>
      </View>
      <View style={style.container}>
        <TextInput
          placeholder="name"
          onChangeText={(text) =>
            setValue((prevValues) => ({ ...prevValues, name: text }))
          }
          style={style.InputBox}
        ></TextInput>
      </View>
      <View style={style.container}>
        <TextInput
          placeholder="Reg No"
          onChangeText={(text) =>
            setValue((prevValues) => ({ ...prevValues, Reg_no: text }))
          }
          style={style.InputBox}
        ></TextInput>
      </View>
      <View style={style.container}>
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) =>
            setValue((prevValues) => ({ ...prevValues, Email: text }))
          }
          style={style.InputBox}
        ></TextInput>
      </View>

      <Picker
        selectedValue={value.Gender}
        onValueChange={(item) =>
          setValue((previous) => ({ ...previous, Gender: item }))
        }
        style={style.containers}
      >
        {gender.map((item, index) => (
          <Picker.Item
            label={item.value}
            key={`anything${item.value},${index}`}
            style={{
              color: "black",
              textAlign: "center",
              fontWeight: "900",
              fontSize: 15,
            }}
            value={item.value}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={value.Batch}
        onValueChange={(item) =>
          setValue((previous) => ({ ...previous, Batch: item }))
        }
        style={style.containers}
      >
        {batch.map((item, index) => (
          <Picker.Item
            label={item.value}
            key={`anything${item.value},${index}`}
            style={{
              color: "black",
              textAlign: "center",
              fontWeight: "900",
              fontSize: 15,
            }}
            value={item.value}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={value.Degree}
        onValueChange={(item) =>
          setValue((previous) => ({ ...previous, Degree: item }))
        }
        style={style.containers}
      >
        {degree.map((item, index) => (
          <Picker.Item
            label={item.value}
            key={`anything${item.value},${index}`}
            style={{
              color: "black",
              textAlign: "center",
              fontWeight: "900",
              fontSize: 15,
            }}
            value={item.value}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={value.Course}
        onValueChange={(item) =>
          setValue((previous) => ({ ...previous, Course: item }))
        }
        style={style.containers}
      >
        {course.map((item, index) => (
          <Picker.Item
            label={item.value}
            key={`anything${item.value},${index}`}
            style={{
              color: "black",
              textAlign: "center",
              fontWeight: "900",
              fontSize: 15,
            }}
            value={item.value}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={value.Department}
        onValueChange={(item) =>
          setValue((previous) => ({ ...previous, Department: item }))
        }
        style={style.containers}
      >
        {department.map((item, index) => (
          <Picker.Item
            label={item.value}
            key={`anything${item.value},${index}`}
            style={{
              color: "black",
              textAlign: "center",
              fontWeight: "900",
              fontSize: 15,
            }}
            value={item.value}
          />
        ))}
      </Picker>
      {message ? (
        <Text style={{ color: "red", textAlign: "center" }}>{message}</Text>
      ) : (
        <></>
      )}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: 10,
        }}
      >
        <TouchableOpacity
          onPress={save}
          style={[style.button, { backgroundColor: "#a005e8" }]}
        >
          <Text style={style.Text}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBack}
          style={[style.button, { backgroundColor: "black" }]}
        >
          <Text style={style.Text}>BACK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    margin: 6,
    borderRadius: 12,
    backgroundColor: "whitesmoke",
    width: "80%",
    shadowColor: "black",
    elevation: 6,
  },
  containers: {
    margin: 6,
    backgroundColor: "whitesmoke",
    width: "80%",
    shadowColor: "black",
    elevation: 6,
  },
  button: {
    width: "40%",
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    shadowColor: "black",
    elevation: 6,
  },
  InputBox: {
    paddingLeft: 10,
    padding: 10,
    width: "98%",
  },
  Text: {
    textAlign: "center",
    fontWeight: "900",
    color: "white",
  },
});
export default AddUser;
