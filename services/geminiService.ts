import { GoogleGenAI, Type } from "@google/genai";
import type { DesignSystem, ExtractedTokens } from "../types";

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        colorPalette: {
            type: Type.ARRAY,
            description: "An array of color tokens.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Semantic name, e.g., 'Primary Action'" },
                    variable: { type: Type.STRING, description: "CSS custom property, e.g., '--color-primary-500'" },
                    hex: { type: Type.STRING, description: "Color in hex format, e.g., '#000000'" },
                    description: { type: Type.STRING, description: "Brief description of its intended use." },
                },
                required: ["name", "variable", "hex", "description"],
            },
        },
        typographyScale: {
            type: Type.ARRAY,
            description: "An array of typography tokens.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Semantic name, e.g., 'Heading 1'" },
                    variable: { type: Type.STRING, description: "CSS custom property, e.g., '--font-heading-1'" },
                    fontFamily: { type: Type.STRING, description: "Font family name." },
                    fontSize: { type: Type.STRING, description: "Font size with units, e.g., '32px'." },
                    fontWeight: { type: Type.STRING, description: "Font weight, e.g., '700'." },
                    description: { type: Type.STRING, description: "Brief description of its intended use." },
                },
                required: ["name", "variable", "fontFamily", "fontSize", "fontWeight", "description"],
            },
        },
        layoutSystem: {
            type: Type.ARRAY,
            description: "An array of layout and spacing tokens.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Semantic name, e.g., 'Spacing Small' or 'Container Max Width'" },
                    variable: { type: Type.STRING, description: "CSS custom property, e.g., '--spacing-sm'" },
                    value: { type: Type.STRING, description: "The value with units, e.g., '8px' or '1280px'" },
                    description: { type: Type.STRING, description: "Brief description of its use." },
                },
                 required: ["name", "variable", "value", "description"],
            }
        },
        borderRadiusTokens: {
            type: Type.ARRAY,
            description: "An array of border radius tokens.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Semantic name, e.g., 'Radius Small' or 'Pill Shape'" },
                    variable: { type: Type.STRING, description: "CSS custom property, e.g., '--radius-sm'" },
                    value: { type: Type.STRING, description: "The value with units, e.g., '4px' or '9999px'" },
                    description: { type: Type.STRING, description: "Brief description of its use." },
                },
                 required: ["name", "variable", "value", "description"],
            }
        },
        uiComponents: {
            type: Type.ARRAY,
            description: "An array of replicated atomic UI components.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Component name, e.g., 'Primary Button'" },
                    description: { type: Type.STRING, description: "Brief description of the component." },
                    html: { type: Type.STRING, description: "The raw HTML code for the component." },
                    css: { type: Type.STRING, description: "The raw, self-contained CSS code for the component." },
                },
                required: ["name", "description", "html", "css"],
            }
        },
        fontFiles: {
            type: Type.ARRAY,
            description: "An array of downloadable font files.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Filename of the font, e.g., 'inter-v12-latin-regular.woff2'." },
                    url: { type: Type.STRING, description: "The full URL to download the font file." },
                },
                required: ["name", "url"],
            },
        },
        iconFiles: {
            type: Type.ARRAY,
            description: "An array of downloadable icon files.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Filename of the icon, e.g., 'arrow-right.svg'." },
                    url: { type: Type.STRING, description: "The full URL to download the icon file." },
                },
                required: ["name", "url"],
            },
        },
        markdownContent: {
            type: Type.STRING,
            description: "A complete Markdown file content that documents the design system with variables and usage examples for all token types.",
        },
    },
    required: ["colorPalette", "typographyScale", "layoutSystem", "borderRadiusTokens", "uiComponents", "fontFiles", "iconFiles", "markdownContent"],
};


export const generateDesignSystem = async (tokens: ExtractedTokens, apiKey: string): Promise<DesignSystem> => {
    if (!apiKey) {
        throw new Error("API Key is not provided.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
        Analyze the following design tokens extracted from a website's HTML and generate a comprehensive, structured design system.
        The goal is to create a professional, well-organized system with clear naming conventions, replicable components, and usage guidelines.
        The final output must be a single JSON object matching the provided schema.

        Extracted Colors:
        ${tokens.colors.join(', ')}

        Extracted Font Families:
        ${tokens.fontFamilies.join(', ')}
        
        Extracted Border Radii:
        ${tokens.borderRadii.join(', ')}

        Extracted Font URLs:
        ${tokens.fontUrls.join(', ')}
        
        Extracted Icon URLs:
        ${tokens.iconUrls.join(', ')}

        **Detailed Instructions:**

        1.  **Color Palette**: Group similar colors. Assign semantic names (e.g., primary, secondary, accent, neutral, text, background). Create shades if applicable (e.g., primary-500, primary-600). Ensure all colors are in HEX format.

        2.  **Typography Scale**: Define a typographic scale. Create semantic names (e.g., Heading 1, Body, Caption). Assign appropriate font sizes and weights.

        3.  **Layout & Spacing**: Analyze the HTML for common spacing patterns (margins, paddings) and container widths. Define a spacing scale (e.g., sm, md, lg) and layout tokens. Values should have units (e.g., 8px, 1280px).

        4.  **Border Radius**: Analyze the border-radius values. Define a scale (e.g., sm, md, lg, full). Assign semantic names and CSS variables.

        5.  **UI Components**: Identify 2-4 distinct, atomic UI components from the HTML (e.g., buttons, input fields, tags, cards). For each component:
            - Provide a semantic name (e.g., 'Primary Button', 'Text Input').
            - Write clean, semantic HTML for the component.
            - Write self-contained, non-nested CSS for the component. DO NOT use preprocessors. Use the color and spacing variables you defined earlier if possible. The CSS should style the component from scratch.

        6.  **Asset Files (Fonts & Icons)**:
            - For each Font URL, create a font file object. The 'name' should be the filename extracted from the URL.
            - For each Icon URL, create an icon file object. The 'name' should be the filename.

        7.  **Markdown Content**: Generate a complete Markdown (.md) file content. This file should be a comprehensive guide to the design system, including:
            - An introduction.
            - Sections for Color, Typography, Layout, and Border Radius tokens with CSS variables and usage examples.
            - A section showcasing the UI Components with their code snippets.

        8.  **Final Output**: Structure everything into a single, valid JSON object that strictly follows the provided schema. Do not include any text or explanations outside of the JSON object.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedSystem = JSON.parse(jsonText);

        if (!parsedSystem.colorPalette || !parsedSystem.typographyScale || !parsedSystem.markdownContent) {
            throw new Error("AI response is missing required fields.");
        }

        return parsedSystem as DesignSystem;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof SyntaxError) {
             throw new Error("Failed to parse the AI's response. The data might be malformed.");
        }
        if (error instanceof Error && error.message.includes('API key not valid')) {
            throw new Error("Your API key is not valid. Please check it and try again.");
        }
        throw new Error("Failed to communicate with the AI model. The service may be unavailable or the request failed.");
    }
};