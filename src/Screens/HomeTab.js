import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RoomScreen from "./RoomScreen";
import ChatScreen from "./ChatScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../Utils/Colors";
const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.primary,
        tabBarShowLabel: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        tabBarStyle: [
          {
            backgroundColor: colors.bg,
            height: 55,
            borderTopWidth: 0,
            elevation: 5,
          },
        ],
      }}
    >
      <Tab.Screen
        name="Rooms"
        component={RoomScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-outline" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
