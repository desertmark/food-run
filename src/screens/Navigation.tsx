import { FC } from "react";
import { View } from "react-native";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, IconButton, Text, Avatar } from "@react-native-material/core";

import { useAuth } from "../providers/AuthProvider";
import { HomeScreen } from "./HomeScreen";
import { LoginScreen } from "./LoginScreen";
import { OrderScreen } from "./OrderScreen";

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
  return (
    <Stack.Navigator initialRouteName={Screens.Home}>
      <Stack.Screen
        name={Screens.Home}
        component={HomeNavigation}
        options={{
          headerTitle: () => (
            <Text color="primary" variant="h6">
              {currentUser?.displayName}
            </Text>
          ),
          headerLeft: () => (
            <View style={{ paddingRight: 8 }}>
              <Avatar
                size={32}
                color="primary"
                icon={<Icon name="account" size={24} color="on-primary" />}
              />
            </View>
          ),
          headerRight: () => (
            <IconButton
              icon={<Icon name="logout" size={24} color="primary" />}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => (
  <HomeTab.Navigator>
    <HomeTab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarIcon: () => <Icon name="home" size={32} color="primary" />,
      }}
    />
    <HomeTab.Screen
      name="Orders"
      component={OrderScreen}
      options={{
        headerShown: false,
        title: "Make my order",
        tabBarIcon: () => (
          <Icon name="food-drumstick" size={32} color="primary" />
        ),
      }}
    />
  </HomeTab.Navigator>
);
