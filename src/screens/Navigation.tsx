import { FC } from "react";
import { View, Image, useColorScheme } from "react-native";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Icon,
  IconButton,
  Text,
  Avatar,
  Flex,
} from "@react-native-material/core";
import logo from "../../assets/food-run-logo-512.png";
import { BlurView } from "expo-blur";

import { useAuth } from "../providers/AuthProvider";
import { HomeScreen } from "./HomeScreen";
import { LoginScreen } from "./LoginScreen";
import { OrderScreen } from "./OrderScreen";
import { useMainColor, useOnColor } from "../config/Theme";

const Stack = createNativeStackNavigator();
const HomeTab = createBottomTabNavigator();
// Props every screen receives
export interface ScreenNavigationProps {
  navigation: NavigationProp<ScreenNavigation>;
}
// Available screens to navigate to.
export enum Screens {
  Login = "Login",
  Home = "Home",
  Orders = "Orders",
}

// Expected navigation parameters per screen.
export interface ScreenNavigation {
  [Screens.Login]: undefined;
  [Screens.Home]: undefined;
  [Screens.Orders]: undefined;
}

export const Navigation: FC<unknown> = () => {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateStack /> : <PublicStack />}
    </NavigationContainer>
  );
};

const PublicStack = () => (
  <Stack.Navigator initialRouteName={Screens.Login}>
    <Stack.Screen
      name={Screens.Login}
      component={LoginScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const PrivateStack = () => {
  const { currentUser, logout } = useAuth();
  const primary = useMainColor("primary");

  return (
    <Stack.Navigator initialRouteName={Screens.Home}>
      <Stack.Screen
        name={Screens.Home}
        component={HomeNavigation}
        options={{
          headerStyle: {
            backgroundColor: primary,
          },
          headerTitle: () => (
            <Flex direction="row" items="center">
              <Avatar
                size={32}
                color="secondary"
                style={{ marginRight: 8 }}
                icon={<Icon name="account" size={24} color="primary" />}
              />
              <Text color="secondary" variant="h6">
                {currentUser?.displayName}
              </Text>
            </Flex>
          ),
          headerLeft: () => (
            <View
              style={{
                paddingRight: 8,
              }}
            >
              <Image source={logo} style={{ width: 64, height: 64 }} />
            </View>
          ),
          headerRight: () => (
            <IconButton
              icon={<Icon name="logout" size={24} color="secondary" />}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => {
  const primary = useMainColor("primary");
  const secondary = useMainColor("secondary");
  return (
    <HomeTab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: primary,
        tabBarActiveBackgroundColor: primary,
        tabBarActiveTintColor: secondary,
      }}
    >
      <HomeTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: (props) => <Icon name="home" size={32} {...props} />,
        }}
      />
      <HomeTab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          headerShown: false,
          title: "Make my order",

          tabBarIcon: (props) => (
            <Icon name="food-drumstick" size={32} {...props} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};
