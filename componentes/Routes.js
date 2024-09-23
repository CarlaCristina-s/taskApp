import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

import Home from "./Home";
import Task from "./Task";
import Messages from "./Messages";

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator
      initialRouteName="Task"
      screenOptions={{
        tabBarActiveBackgroundColor: "#6ab09b",
        tabBarLabelStyle: estilos.textoAba,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#eee",
          borderTopWidth: 0,
          marginHorizontal: 10,
          elevation: 0,
          borderRadius: 4,
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="home" size={24} color="#808080" />;
          },
        }}
      />

      <Tab.Screen
        name="Task"
        component={Task}
        options={{
          headerShown: false,

          tabBarIcon: () => {
            return <FontAwesome5 name="tasks" size={24} color="#808080" />;
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <MaterialIcons name="message" size={24} color="#808080" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Routes;

const estilos = StyleSheet.create({
  iconeAba: {
    width: 64,
    height: 64,
  },
  textoAba: {
    fontSize: 14,
    lineHeight: 15,
    marginBottom: 4,
  },
});
