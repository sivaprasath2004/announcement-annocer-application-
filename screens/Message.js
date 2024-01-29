import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import Loader from "../components/Loader";
import axios from "axios";
const Messages = () => {
  const [mails, setMails] = useState({
    All: "null",
    clickMail: "null",
    checking: "null",
  });
  const [checker, setChecker] = useState({
    ViewMessage: false,
    mailView: false,
    mailUpadetes: "hello",
    messageViews: true,
  });
  function InduvidualMails(id) {
    setChecker({ ViewMessage: !checker.ViewMessage });
    if (id !== "null") {
      setMails((previous) => ({
        ...previous,
        clickMail: mails.All.find((item) => item._id === id),
      }));
    }
  }

  function handleEmail(item) {
    setChecker((previous) => ({ ...previous, mailView: item }));
  }
  function renderSingleMail() {
    return (
      <View style={{height:'100%',backgroundColor:'white'}}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => InduvidualMails("null")}>
            <AntDesign name="arrowleft" size={35} color="black" />
          </TouchableOpacity>
          {checker.mailView ? (
            <TouchableOpacity
              onPress={() => handleEmail(false)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                minWidth: 70,
                justifyContent: "center",
                borderRadius: 25,
              }}
            >
              <MaterialIcons name="cancel" size={35} color="black" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity
            onPress={() => handleEmail(true)}
            style={{
              flexDirection: "row",
              gap: 8,
              backgroundColor: "white",
              alignItems: "center",
              minWidth: 70,
              justifyContent: "center",
              borderRadius: 25,
              shadowColor:'black',elevation:10
            }}
          >
            <MaterialCommunityIcons name="account" size={24} color="black" />
            <Text>{mails.clickMail.Email.length}</Text>
          </TouchableOpacity>
        </View>
        {checker.mailView ? (
          <>
            <View
              style={{
                position: "absolute",
                right: 10,
                backgroundColor: "white",
                top: 50,
                minHeight: 50,
                shadowColor:'black',elevation:10,
                maxHeight: 700,
                zIndex: 2,
              }}
            >
              <FlatList
                data={mails.clickMail.Email}
                renderItem={({ item, index }) => (
                  <View
                    style={{ width: 250, borderBottomWidth: 0.8 }}
                    key={`viewtagmail${index}`}
                  >
                    <Text
                      style={{ padding: 10, fontWeight: "600" }}
                      key={`emails${index}`}
                    >
                      {item}
                    </Text>
                  </View>
                )}
              />
            </View>
          </>
        ) : (
          <></>
        )}
        <ScrollView>
          <View style={{ paddingLeft: 10, gap: 50 }}>
            <Text
              style={{
                fontSize: 15,
                position: "absolute",
                right: 10,
                top: 0,
                fontWeight: "400",
              }}
            >
              {mails.clickMail.Time}
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "500" }}>
              {mails.clickMail.Subject === "null" ||
              mails.clickMail.Subject === undefined
                ? "(no Subject)"
                : mails.clickMail.Subject}
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "400",
                color: mails.clickMail.TitleColor,
              }}
            >
              {mails.clickMail.Title === undefined ||
              mails.clickMail.Title === "null"
                ? "(no Title)"
                : mails.clickMail.Title}
            </Text>
            {mails.clickMail.Image === undefined ||
            mails.clickMail.Image === "null" ? (
              <></>
            ) : (
              <Image
                source={{ uri: mails.clickMail.Image }}
                style={{
                  objectFit: "contain",
                  height: mails.clickMail.ImageHeight,
                  width: mails.clickMail.ImageWidth,
                }}
              />
            )}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: mails.clickMail.ContentColor,
              }}
            >
              {mails.clickMail.Content === undefined ||
              mails.clickMail.Content === "null"
                ? "(no content)"
                : mails.clickMail.Content}
            </Text>
            {mails.clickMail.Link === undefined ||
            mails.clickMail.Link === "null" ? (
              <></>
            ) : (
              <Text
                style={{
                  color: "blue",
                  fontSize: 15,
                  textDecorationLine: "underline",
                  fontWeight: "700",
                }}
              >{`Link: ${mails.clickMail.Link}`}</Text>
            )}
            {Object.values(mails.clickMail.Attachment).map((item,index)=>(
              <View key={`view_tags_attachement${index}`} style={{borderWidth:.2,padding:10,width:'95%'}}>
            <Text key={`index${index}`}>{`Attachment:${index+1}`}</Text>    
            <Text key={`contenttype${index}`}>{`content type:${item.contentType}`}</Text>
            <Text key={`filename${index}`}>{`filename:${item.filename}`}</Text>
            <Text  style={{color:'blue',textDecorationLine:'underline'}} onPress={()=>Linking.openURL(item.path)} key={`path${index}`}>{`path:${item.path}`}</Text>
            </View>
            ))}
            <Text>-/-</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://annoncement-annocer-backend.vercel.app/mails"
      );
      setMails((previous) => ({
        ...previous,
        All: response.data.length === 0 ? "noMore" : response.data.reverse(),
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {mails.All === "null" ? (
        <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
        <View
          style={{
            position: "absolute",
            top: "50%",
            right: "30%",
            width: "50%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3,
            gap: 20,
          }}
        >
          <Loader />
          <Text style={{ fontSize: 20, fontWeight: "900" }}>Loading...</Text>
        </View>
        </View>
      ) : mails.All === "noMore" ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ textAlign: "center" }}>No more Messages</Text>
        </View>
      ) : !checker.ViewMessage ? (
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
          }}
        >
          <FlatList
            data={mails.All}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => InduvidualMails(item._id)}>
                <View
                  key={`View_tag1${index}`}
                  style={{
                    marginTop: 15,
                    flexDirection: "row",
                    gap: 15,
                    padding: 10,
                    backgroundColor: "white",
                    borderBottomWidth: 2,
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={50}
                    color="black"
                  />
                  <View style={{ flex: 3, gap: 5 }}>
                    <Text
                      style={{ fontWeight: "900", fontSize: 20 }}
                      key={`Subject${index}`}
                    >
                      {item.Subject === undefined || item.Subject === "null"
                        ? "(no Subject)"
                        : item.Subject.length >= 22
                        ? item.Subject.slice(0, 28) + "...."
                        : item.Subject}
                    </Text>
                    <Text style={{ fontWeight: "800" }} key={`Title${index}`}>
                      {item.Title === undefined || item.Title === "null"
                        ? "(no content)"
                        : item.Title.length >= 22
                        ? item.Title.slice(0, 28) + "...."
                        : item.Title}
                    </Text>
                    <Text
                      style={{ fontWeight: "800", color: "gray" }}
                      key={`content${index}`}
                    >
                      {item.Content === undefined || item.Content === "null"
                        ? "(no content)"
                        : item.Content.length >= 22
                        ? item.Content.slice(0, 28) + "...."
                        : item.Content}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }} key={`View_tag2${index}`}>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                      key={`View_tag3${index}`}
                    >
                      <Text
                        key={`color${index}`}
                        style={{
                          height: 10,
                          width: 10,
                          top: 1,
                          backgroundColor: "green",
                          borderRadius: 50,
                        }}
                      ></Text>
                      <Text key={`info${index}`}>sended</Text>
                    </View>
                    <Text key={`Time${index}`}>{item.Time}</Text>
                    <View
                      key={`View_tag4${index}`}
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="account"
                        size={20}
                        color="black"
                      />

                      <Text key={`Email_length${index}`}>
                        {item.Email === undefined ? "0" : item.Email.length}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        renderSingleMail()
      )}
    </>
  );
};
export default Messages;
