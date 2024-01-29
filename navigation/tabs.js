import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Setttings, AddMessage, Messages } from "../screens";
import { useState } from "react";
import TabIcon from "../components/TabIcon";
const Tab = createBottomTabNavigator();
const Tabs = () => {
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: [
          {
            backgroundColor: "white",
            height: 50,
          },
          null,
        ],
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Message"
        component={Messages}
      
        options={{
          headerTitleStyle: {
            fontWeight: "900",
            fontSize: 24,
          },
          headerStyle:{
shadowColor:'black',elevation:10,
          },
          tabBarIcon: ({ focused }) => {
            
            return <TabIcon focus={focused} value={"message"} />;
            
          },
        }}
      />
      <Tab.Screen
        name="Send Message"
        component={AddMessage}
        
        options={{
          headerTitleStyle: {
            fontWeight: "900",
            fontSize: 24,
          },headerStyle:{
            shadowColor:'black',elevation:10
                      },
          tabBarIcon: ({ focused }) => {
           
            return <TabIcon focus={focused} value={"Add"} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setttings}
        options={{
          headerTitleStyle: {
            fontWeight: "900",
            fontSize: 24,
          },headerStyle:{
            shadowColor:'black',elevation:10
                      },
          tabBarIcon: ({ focused }) => {
            return <TabIcon focus={focused} value={"settings"} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
