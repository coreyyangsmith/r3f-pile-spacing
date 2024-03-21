// MUI Dependencies
import { createTheme } from "@mui/material";

const fontFamily = "Outfit"
import {
    primary1,
    primary2,
    primary3,
    primary4,
    primary5,
    primary6,
    dark1,
    dark2,
    dark3,
    dark4,
    dark5,
    dark6,
    mixed1,
    mixed2,
    mixed3,
    mixed4,
    mixed5,
    mixed6,
    text_black,
    text_dg,
    text_lg
} from "./Color"

declare module "@mui/material/styles" {
    interface Palette {
        primary1: Palette["primary"];
        primary2: Palette["primary"];
        primary3: Palette["primary"];
        primary4: Palette["primary"];
        primary5: Palette["primary"];
        primary6: Palette["primary"];
        dark1: Palette["primary"];
        dark2: Palette["primary"];
        dark3: Palette["primary"];
        dark4: Palette["primary"];
        dark5: Palette["primary"];
        dark6: Palette["primary"];
        mixed1: Palette["primary"];
        mixed2: Palette["primary"];
        mixed3: Palette["primary"];
        mixed4: Palette["primary"];
        mixed5: Palette["primary"];
        mixed6: Palette["primary"];
        text_black: Palette["primary"];
        text_dg: Palette["primary"];
        text_lg: Palette["primary"];
    }

    interface PaletteOptions {
        primary1?: PaletteOptions["primary"];
        primary2?: PaletteOptions["primary"];
        primary3?: PaletteOptions["primary"];
        primary4?: PaletteOptions["primary"];
        primary5?: PaletteOptions["primary"];
        primary6?: PaletteOptions["primary"];
        dark1?: PaletteOptions["primary"];
        dark2?: PaletteOptions["primary"];
        dark3?: PaletteOptions["primary"];
        dark4?: PaletteOptions["primary"];
        dark5?: PaletteOptions["primary"];
        dark6?: PaletteOptions["primary"];
        mixed1?: PaletteOptions["primary"];
        mixed2?: PaletteOptions["primary"];
        mixed3?: PaletteOptions["primary"];
        mixed4?: PaletteOptions["primary"];
        mixed5?: PaletteOptions["primary"];
        mixed6?: PaletteOptions["primary"];
        text_black: PaletteOptions["primary"];
        text_dg: PaletteOptions["primary"];
        text_lg: PaletteOptions["primary"];
    }

    interface TypographyVariants {
        title: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        title?: React.CSSProperties;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        title: true;
    }
}

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary1: { main: primary1, },
        primary2: { main: primary2, },
        primary3: { main: primary3, },
        primary4: { main: primary4, },
        primary5: { main: primary5, },
        primary6: { main: primary6, },

        dark1: { main: dark1, },
        dark2: { main: dark2, },
        dark3: { main: dark3, },
        dark4: { main: dark4, },
        dark5: { main: dark5, },
        dark6: { main: dark6, },

        mixed1: { main: mixed1, },
        mixed2: { main: mixed2, },
        mixed3: { main: mixed3, },
        mixed4: { main: mixed4, },
        mixed5: { main: mixed5, },
        mixed6: { main: mixed6, },

        text_black: { main: "#000000", },
        text_dg: { main: "#6d6e71", },
        text_lg: { main: "#c7c8ca", },
    },
    typography: {
        button: { textTransform: "none", },
        fontFamily: [fontFamily, "Helvetica"].join(","),

        title: {
            lineHeight: 1.6,
            fontSize: 52,
            fontWeight: 800,
            fontFamily: fontFamily,
            color: "black",
            letterSpacing: "3px",
        },
        h1: {
            lineHeight: 1.6,
            fontSize: 64,
            fontWeight: 600,
            fontFamily: fontFamily,
            color: "black",
        },
        h2: {
            lineHeight: 1.6,
            fontSize: 36,
            fontWeight: 600,
            fontFamily: fontFamily,
            color: "black",
        },
        h3: {
            lineHeight: 1.6,
            fontSize: 28,
            fontWeight: 600,
            fontFamily: fontFamily,
            color: "black",
        },
        body1: {
            lineHeight: 1.6,
            fontSize: 16,
            fontWeight: 400,
            fontFamily: fontFamily,
            color: "black",
        },
        body2: {
            lineHeight: 1.6,
            fontSize: 12,
            fontWeight: 400,
            fontFamily: fontFamily,
            color: "black",
        },
    },
});