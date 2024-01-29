import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Preview from "../components/Preview";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import tasks from "../components/Document";
import Time from "../constants/Time";
import mail from "../mailer/mail";
const AddMessage = () => {
  const [uri, setUri] = useState("null");
  const [checker, setChecker] = useState({
    toAddress: false,
    checking: true,
  });
  const [by, setBy] = useState({
    Principal: true,
    Director: false,
    Staff: false,
  });
  const [details, setDetails] = useState({
    image: "null",
    EmailAddressReify: "null",
    waiting: false,
    by: "Principal",
  });
  const [edits, setEdits] = useState({ identies: {}, color: {} });
  const [emailaddress, setEmailaddress] = useState({ email: "null" });
  const [attach,setAttach]=useState([])
  useEffect(() => {
    const EmailAddress = async () => {
      let response = await axios.get(
        "https://annoncement-annocer-backend.vercel.app/All",
        {
          params: { category: "College", value: "EASC" },
        }
      );
      let Email = await Object.values(response.data).map((item) => item.Email);
      setEmailaddress((previous) => ({
        ...previous,
        email: Email,
      }));
    };
    EmailAddress();
  }, []);
  function EmailAddressReify(props) {
    setDetails((previous) => ({ ...previous, EmailAddressReify: props.email }));
  }
  const RadioButton = () => {
    const bys = ["Principal", "Director", "Staff"];
    return (
      <>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, fontWeight: "900" }}>by:</Text>
          {bys.map((item, index) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
            >
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => {
                  setBy({ [item]: true });
                  setDetails((previous) => ({ ...previous, by: item }));
                  console.log(details.by);
                }}
              >
                {by[item] ? <View style={styles.innerCircle} /> : <></>}
              </TouchableOpacity>
              <Text style={styles.label}>{item}</Text>
            </View>
          ))}
        </View>
      </>
    );
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: false,
      });
      let uris = result.assets[0].uri;
      let filetypes = result.assets[0].mimeType;
      setUri(uris.split("/").pop());
      setDetails((previous) => ({ ...previous, waiting: true }));
      tasks
        .uploadImage(uris, filetypes)
        .then((result) => {
          setDetails((previous) => ({
            ...previous,
            waiting: false,
          }));
          setAttach((pre)=>[...pre,{ 
            filename:result.fileType!=="image/jpeg"?'important.pdf':'image.jpg',  
            path:result.downloadURL,
            contentType:result.fileType
        }])
        console.log(attach)
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } catch (err) {
      console.log("Error picking document", err);
    }
  };

  async function pickedImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (result.canceled) {
      console.log("error");
    } else {
      setDetails((previous) => ({
        ...previous,
        image: result.assets[0].uri,
        waiting: true,
      }));
      tasks
        .uploadImage(result.assets[0].uri, "image")
        .then((result) => {
          setDetails((previous) => ({
            ...previous,
            imageUrl: result.downloadURL,
            waiting: false,
          }));
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  }
  function emailAddress(props) {
    setEmailaddress((previous) => ({
      ...previous,
      email: Object.values(props.emails).map((item) => item.Email),
    }));
  }
  function ToAdressconform(props) {
    setChecker({ toAddress: props.address, checking: props.check });
  }
  function send(props) {
    let color = props.color;
    let identies = props.identies;

    setEdits({
      identies: {
        height: identies.height === undefined ? 200 : identies.height,
        width: identies.width === undefined ? 200 : identies.width,
      },
      color: {
        Content: color.Content === undefined ? "black" : color.Content,
        Title: color.Title === undefined ? "black" : color.Title,
      },
    });
  }

  const sendMail = () => {
    if (emailaddress.email !== "null") {
      let time = Time();
      mail({
        html: `
      ${
        details.Title === undefined
          ? ""
          : `<h1 style='font-size:28px;font-weight:400;color:${
              edits.color.Title === undefined ? "black" : edits.color.Title
            };'>${details.Title}</h1>`
      }
      ${
        details.imageUrl === undefined
          ? ""
          : `<img src=${details.imageUrl} style='height:${
              edits.identies.height === undefined ? 200 : edits.identies.height
            }px;width:${
              edits.identies.width === undefined ? 200 : edits.identies.width
            }px;' alt='image' />`
      }
      ${
        details.Conetent === undefined
          ? ""
          : `<h6 style='font-weight:600;font-size:18px;color:${
              edits.color.Content === undefined ? "black" : edits.color.Content
            };'>${details.Conetent}<h6/>`
      }   ${
          details.Link === undefined
            ? ""
            : `<a href=${details.Link} style='font-size:15px;'>${details.Link}</a>`
        }
        ${`<table style='width: 100%;'>
      <tr>
      <td style='text-align: right; font-size: 20px; font-weight: 900;'>
        <div><h6 style='padding-right:15px;'>by</h6><h6 style='margin-top: -6px;'>${details.by}</h6></div>
      </td>
      </tr>
      </table>`}   
        `,
        Email: emailaddress.email,
        Subject: details.Subject === undefined ? "null" : details.Subject,
        Title: details.Title === undefined ? "null" : details.Title,
        Conetent: details.Conetent === undefined ? "null" : details.Conetent,
        Image: details.imageUrl === undefined ? "null" : details.imageUrl,
        ImageHeight:
          edits.identies.height === undefined ? 200 : edits.identies.height,
        ImageWidth:
          edits.identies.width === undefined ? 200 : edits.identies.width,
        TitleColor:
          edits.color.Title === undefined ? "black" : edits.color.Title,
        ContentColor:
          edits.color.Content === undefined ? "black" : edits.color.Content,
        Attachment:attach,
        Link: details.Link === undefined ? "null" : details.Link,
        Time: time,
      });
    } else {
      console.log("");
    }
  };
  const renderCreate = () => {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[styles.parentTag,{flexDirection:'row',backgroundColor:'whitesmoke',shadowColor:'black',elevation:10}]}>
          <TextInput
            value={details.Subject === undefined ? "" : details.Subject}
            placeholder="Subject"
            onChangeText={(text) =>
              setDetails((previous) => ({ ...previous, Subject: text }))
            }
            style={{ paddingLeft: 10, padding: 10, width: "98%" }}
          />
        </View>
        <View
          style={{
            padding: 10,
            top: 10,
            borderRadius: 15,
            backgroundColor: "whitesmoke",
            width: "80%",
            alignSelf: "center",
            shadowColor: "black",
            elevation: 6,
          }}
        >
          <TextInput
            value={details.Title === undefined ? "" : details.Title}
            onChangeText={(text) =>
              setDetails((previous) => ({ ...previous, Title: text }))
            }
            placeholder="Title"
          ></TextInput>
          
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingRight: 20,
          }}
        >
          <View
            style={{
              width: "60%",
              height: 150,
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "whitesmoke",
              shadowColor: "black",
              elevation: 6,
            }}
          >
            {details.image === "null" ? (
              <Ionicons name="image" size={40} color="lightgray" />
            ) : (
              <Image
                style={{ width: "80%", height: "80%", objectFit: "contain" }}
                source={{ uri: details.image }}
              />
            )}
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              backgroundColor: "black",
              height: 40,
              width: 40,
              borderRadius: 10,
              alignItems: "center",
              alignSelf: "center",
            }}
            onPress={pickedImage}
          >
            <Ionicons name="image" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={[styles.parentTag,{justifyContent:'flex-start'}]}>
          <TextInput
            value={details.Conetent === undefined ? "" : details.Conetent}
            multiline
            numberOfLines={4}
            onChangeText={(text) =>
              setDetails((previous) => ({ ...previous, Conetent: text }))
            }
            placeholder="Content"
            style={{ borderRadius: 15, height: 100, paddingLeft: 10 }}
          ></TextInput>
        </View>
        <View
          style={{
            padding: 10,
            top: 20,
            borderRadius: 15,
            backgroundColor: "whitesmoke",
            width: "80%",
            alignSelf: "center",
            shadowColor: "black",
            elevation: 6,
          }}
        >
          <TextInput
            value={details.Link === undefined ? "" : details.Link}
            onChangeText={(text) =>
              setDetails((previous) => ({ ...previous, Link: text }))
            }
            placeholder="Link"
            style={{ height: 40 }}
          />
        </View>
        <View style={{ padding: 40 }}>
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingRight: 20,
            }}
          >
            <View
              style={{
                width: "70%",
                height: 150,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "whitesmoke",
                flexDirection: "column",
                shadowColor: "black",
                elevation: 6,
              }}
            >
              <View style={{position:'absolute',top:5,left:5,minWidth:20,borderRadius:20,shadowColor:'black',elevation:4,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
              <Text style={{paddingLeft:10,paddingRight:10}}>{attach.length}</Text>
              </View>
              {uri === "null" ? (
                <Ionicons name="document" size={40} color="lightgray" />
              ) : (
                <>
                  <Ionicons name="document" size={40} color="lightgray" />
                  <Text style={{ color: "black", fontWeight: 900 }}>
                    <Text style={{ color: "#db09e3" }}>Filename:</Text>
                    {uri}
                  </Text>
                </>
              )}
            </View>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                backgroundColor: "black",
                height: 40,
                width: 40,
                borderRadius: 10,
                alignItems: "center",
                alignSelf: "center",
                shadowColor: "black",
                elevation: 10,
              }}
              onPress={() =>
                details.waiting
                  ? setUri("please wait Uploading file..")
                  : pickDocument()
              }
            >
              <Ionicons name="document" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <RadioButton />
        {details.waiting ? (
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              color: "blue",
              fontWeight: "900",
            }}
          >
            Please wait file In uploading...
          </Text>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => sendMail()}
              style={styles.send_button}
            >
              <FontAwesome
                name="send"
                size={24}
                color="white"
                style={styles.send_img}
              />
              <Text style={styles.send_text}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  };
  return (
    <>
    
        {!checker.checking?
          <>
            <TouchableOpacity
              onPress={()=>setChecker((previous)=>({...previous,checking:true}))}
              style={{position:'absolute',shadowColor:'black',elevation:10,bottom:50,right:10,zIndex:10,height:50,width:50,borderRadius:50,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}            >
              <FontAwesome name="plus" size={30} color="green" />
            </TouchableOpacity>
            </>
          : checker.checking?
          <>
            <TouchableOpacity
              onPress={()=>setChecker((previous)=>({...previous,checking:false}))}
              style={{position:'absolute',shadowColor:'black',elevation:10,bottom:50,right:10,zIndex:10,height:50,width:50,borderRadius:50,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}            >
              <AntDesign name="caretright" size={30} color="green" />
            </TouchableOpacity>
          </>
          :<></>
        }
      {checker.toAddress && checker.checking === "false" ? (
        <ToAddressForm
          onUpdate={ToAdressconform}
          onUpdated={emailAddress}
          AnotherUpdate={EmailAddressReify}
          datas={details.EmailAddressReify}
        />
      ) : (
        <></>
      )}
      {!checker.toAddress && checker.checking ? renderCreate() : <></>}
      {!checker.checking ? <Preview onUpdate={send} data={details} /> : <></>}
      </>
  );
};
const styles = StyleSheet.create({
  toaddressChecker: { display: "none" },
  toaddressRemover: { display: "block" },
  Deletetext: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    padding: 10,
    fontWeight: "900",
  },

  parentTag: {
    margin: 15,
    borderRadius: 15,
    backgroundColor: "whitesmoke",
    width: "80%",
    alignSelf: "center",
    shadowColor: "black",
    elevation: 6,
  },
  send_button: {
    flexDirection: "row",
    gap: 20,
    shadowColor: "black",
    elevation: 10,
    top: 10,
    padding: 10,
    backgroundColor: "black",
    width: "40%",
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  send_img: {
    height: 30,
    width: 30,
  },
  send_text: {
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "900",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    gap: 20,
  },
  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "lightgreen",
  },
  label: {
    fontSize: 16,
  },
});

export default AddMessage;
