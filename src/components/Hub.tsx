import { Flex, Text, Button } from "@react-native-material/core";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  View,
} from "react-native";
import { useMainColor } from "../config/Theme";

export interface HubSate {
  animation: Animated.Value;
  viewHeight: number;
  viewWidth: number;
  openHeight: number;
  closedHeight: number;
  isOpen: boolean;
  template: JSX.Element;
  setTemplate: (template: JSX.Element) => void;
  openHub: (template: JSX.Element) => void;
  closeHub: () => void;
  toggleHub: () => void;
}

const HubContext = createContext<HubSate>({} as HubSate);

export const useHub = () => useContext(HubContext);

export const HubProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const viewHeight = Dimensions.get("screen").height;
  const viewWidth = Dimensions.get("window").width;
  const openHeight = viewHeight * 0.5;
  const closedHeight = viewHeight;

  const animation = useRef(new Animated.Value(closedHeight))?.current;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [template, setTemplate] = useState<JSX.Element>(<></>);

  const openHub = (template?: JSX.Element) => {
    Animated.timing(animation, {
      toValue: openHeight,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setTemplate(template);
    setIsOpen(true);
  };

  const closeHub = () => {
    Animated.timing(animation, {
      toValue: closedHeight,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setIsOpen(false);
  };

  const toggleHub = () => {
    isOpen ? closeHub() : openHub();
  };

  return (
    <HubContext.Provider
      value={{
        animation,
        viewHeight,
        viewWidth,
        openHeight,
        closedHeight,
        isOpen,
        template,
        setTemplate,
        openHub,
        closeHub,
        toggleHub,
      }}
    >
      {children}
    </HubContext.Provider>
  );
};

export const Hub: FC<unknown> = () => {
  const {
    animation,
    viewHeight,
    viewWidth,
    openHeight,
    closedHeight,
    template,
    isOpen,
    closeHub,
  } = useHub();
  const primary = useMainColor("primary");

  return (
    <>
      {isOpen && (
        <Pressable
          onPress={closeHub}
          style={{
            backgroundColor: "black",
            position: "absolute",
            top: 0,
            left: 0,
            height: viewHeight,
            width: viewWidth,
            opacity: 0.6,
          }}
        ></Pressable>
      )}
      <Animated.View
        onTouchMove={(e) => {
          animation.setValue(e.nativeEvent.pageY);
        }}
        onTouchEnd={(e) => {
          if (e.nativeEvent.pageY > viewHeight * 0.8) {
            closeHub();
          } else {
            animation.setValue(openHeight);
          }
        }}
        style={{
          borderRadius: 20,
          position: "absolute",
          top: animation,
          height: viewHeight,
          width: viewWidth,
          opacity: 0.8,
          backgroundColor: primary,
          paddingVertical: 16,
        }}
      >
        {/* <View
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "red",
          width: viewWidth,
        }}
      >
        <View
          style={{
            height: 4,
            width: 75,
            backgroundColor: secondary,
          }}
        ></View>
      </View> */}
        {template}
      </Animated.View>
    </>
  );
};

export const ConfirmHubTemplate: FC<{
  onConfirm?: () => void;
  onCancel?: () => void;
}> = ({ onConfirm, onCancel }) => (
  <Flex p={16}>
    <Text variant="h5" color="on-primary" style={{ textAlign: "center" }}>
      Do want to confirm this order?
    </Text>

    <Button
      title="ok"
      color="secondary"
      style={{ marginTop: 40 }}
      onPress={onConfirm}
    />
    <Button
      onPress={onCancel}
      title="cancel"
      color="secondary"
      style={{ marginTop: 24 }}
      variant="outlined"
    />
  </Flex>
);
