import {
  defaultTheme,
  Theme,
  useTheme,
  PaletteColorName as MaterialPalleteColorName,
} from "@react-native-material/core";
import { merge } from "lodash";
import { useFonts } from "expo-font";

export type PalleteColorName = MaterialPalleteColorName | "warning";

const overrides: Partial<Theme> = {
  palette: {
    primary: {
      main: "#081b45",
      on: "#fff",
    },
    secondary: {
      main: "#fae9e1",
      on: "000",
    },
    warning: {
      main: "#ef6c00",
      on: "rgba(0, 0, 0, 0.87)",
    },
  },
};

export const theme: Theme = merge(defaultTheme, overrides);

export const useMainColor = (name: PalleteColorName): string => {
  return useTheme()?.palette[name].main;
};

export const useOnColor = (name: PalleteColorName): string => {
  return useTheme()?.palette[name].on;
};

export const useLogoFont = () => {
  return useFonts({
    "Logo-Font": require("../../assets/logo-font.ttf"),
  });
};
