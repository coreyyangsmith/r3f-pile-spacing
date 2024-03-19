// MUI Dependencies
import { createTheme } from "@mui/material";

const fontFamily = "Outfit"

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
        primary1: { main: "#FFEB3B", },
        primary2: { main: "#FFED58", },
        primary3: { main: "#FFEF70", },
        primary4: { main: "#FFF186", },
        primary5: { main: "#FFF49B", },
        primary6: { main: "#FFF6AF", },

        dark1: { main: "#121212", },
        dark2: { main: "#282828", },
        dark3: { main: "#3F3F3F", },
        dark4: { main: "#575757", },
        dark5: { main: "#717171", },
        dark6: { main: "#8B8B8B", },

        mixed1: { main: "#262419", },
        mixed2: { main: "#3B382E", },
        mixed3: { main: "#504E45", },
        mixed4: { main: "#67655C", },
        mixed5: { main: "#7E7D75", },
        mixed6: { main: "#97958F", },

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
            fontSize: 18,
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