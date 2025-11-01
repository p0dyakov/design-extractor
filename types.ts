export interface ExtractedTokens {
    colors: string[];
    fontFamilies: string[];
    fontUrls: string[];
    iconUrls: string[];
    borderRadii: string[];
}

export interface ColorToken {
    name: string;
    variable: string;
    hex: string;
    description: string;
}

export interface TypoToken {
    name: string;
    variable: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    description: string;
}

export interface LayoutToken {
    name: string;
    variable: string;
    value: string;
    description: string;
}

export interface BorderRadiusToken {
    name: string;
    variable: string;
    value: string;
    description: string;
}

export interface ComponentToken {
    name: string;
    description: string;
    html: string;
    css: string;
}

export interface AssetFile {
    name: string;
    url: string;
}

export interface DesignSystem {
    colorPalette: ColorToken[];
    typographyScale: TypoToken[];
    layoutSystem: LayoutToken[];
    borderRadiusTokens: BorderRadiusToken[];
    uiComponents: ComponentToken[];
    fontFiles: AssetFile[];
    iconFiles: AssetFile[];
    markdownContent: string;
}