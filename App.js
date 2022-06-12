import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloProvider } from "@apollo/client";
import Home from "./src/Screens/HomeTab";
import client from "./src/Apps/ApolloClient";
import AuthScreen from "./src/Screens/AuthScreen";
import IntroScreen from "./src/Screens/IntroScreen";
import ChatRoomScreen from "./src/Screens/ChatRoomScreen";
import { StatusBar } from "react-native";
import { colors } from "./src/Utils/Colors";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.bg} barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="IntroScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
