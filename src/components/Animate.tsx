import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

export interface AnimationProps {
  duration: number;
}
export interface FadeInAnimationProps extends AnimationProps {
  style?: ViewStyle;
}

export const FadeInAnimation: FC<PropsWithChildren<FadeInAnimationProps>> = ({
  children,
  duration,
  style,
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const trigger = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    });
  };

  useEffect(() => {
    trigger();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: animation,
      }}
    >
      {children}
    </Animated.View>
  );
};
