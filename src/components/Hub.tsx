import { Flex, Text, Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
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
  BackHandler,
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
    template,
    isOpen,
    closeHub,
  } = useHub();
  const primary = useMainColor("primary");
  const [touchStartPosition, setTouchStartPosition] = useState<number>();

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
        style={{
          borderRadius: 20,
          position: "absolute",
          top: animation,
          left: 0,
          height: viewHeight,
          width: viewWidth,
          opacity: 0.8,
          backgroundColor: primary,
          paddingVertical: 16,
        }}
      >
        <View
          onTouchStart={(e) => {
            setTouchStartPosition(e.nativeEvent.pageY);
          }}
          onTouchMove={(e) => {
            animation.setValue(e.nativeEvent.pageY);
          }}
          onTouchEnd={(e) => {
            if (touchStartPosition < e.nativeEvent.pageY) {
              closeHub();
            } else {
              animation.setValue(openHeight);
            }
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: 50,
          }}
        >
          <View
            style={{
              height: 4,
              width: 75,
              borderRadius: 50,
              backgroundColor: useMainColor("secondary"),
            }}
          />
        </View>
        {template}
      </Animated.View>
    </>
  );
};

export const useHubBackHandler = () => {
  const { closeHub, isOpen } = useHub();

  const navigator = useNavigation();

  useEffect(() => {
    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (isOpen) {
        closeHub();
      } else {
        navigator.goBack();
        handler.remove();
      }
      return true;
    });

    return () => handler.remove();
  }, [isOpen]);
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
