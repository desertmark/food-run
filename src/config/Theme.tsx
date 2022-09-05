import {
  defaultTheme,
  Theme,
  useTheme,
  PaletteColorName as MaterialPalleteColorName,
} from "@react-native-material/core";
import { merge } from "lodash";
export type PalleteColorName = MaterialPalleteColorName | "warning";
const overrides: Partial<Theme> = {
  palette: {
    primary: {
      main: "#0d47a1",
      on: "#fff",
    },
    secondary: {
      main: "#d81b60",
      on: "#fff",
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
