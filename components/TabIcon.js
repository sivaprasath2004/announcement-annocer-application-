import { View} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
const TabIcon = (props) => {
  let focus = props.focus;
  let value = props.value;
  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
        {value === "message" ? (
          <View style={{borderBottomWidth:4,width:50,borderColor:focus?'red':'white',justifyContent:'center',alignItems:'center'}}>
          <MaterialIcons
            name="message"
            size={30}
            color={focus ? "red" : "gray"}
          />
          </View>
        ) : value === "Add" ? (
          <View style={{borderBottomWidth:4,width:50,borderColor:focus?'red':'white',justifyContent:'center',alignItems:'center'}}>
          <MaterialIcons
            name="library-add"
            size={30}
            color={focus ? "red" : "gray"}
          /></View>
        ) : value === "settings" ? (
          <View style={{borderBottomWidth:4,width:50,borderColor:focus?'red':'white',justifyContent:'center',alignItems:'center'}}>
          <Ionicons name="settings" size={30} color={focus ? "red" : "gray"} />
          </View>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

export default TabIcon;
