import { Flex } from "@react-native-material/core";
import { FC, useEffect, useRef } from "react";
import { Image, Animated, View } from "react-native";
import logo from "../../assets/food-run-logo-512.png";
import logoSecondary from "../../assets/food-run-logo-alt-512.png";

export interface LogoProps {
  size?: number;
  secondary?: boolean;
}

export const Logo: FC<LogoProps> = ({ size, secondary }) => {
  return (
    <Image
      source={secondary ? logoSecondary : logo}
      style={{ width: size || "auto", height: size || "auto" }}
    />
  );
};

export const LogoPopAnimation: FC<LogoProps> = ({ size, secondary }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const trigger = () => {
    Animated.timing(animation, {
      toValue: size * 1.2,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: size,
        duration: 100,
        useNativeDriver: false,
      }).start();
    });
  };

  useEffect(() => {
    trigger();
  }, []);

  return (
    <Flex items="center" justify="center" style={{ height: size, width: size }}>
      <Animated.Image
        style={{
          height: animation,
          width: animation,
        }}
        source={secondary ? logoSecondary : logo}
      />
    </Flex>
  );
};
