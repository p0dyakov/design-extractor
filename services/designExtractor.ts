import type { ExtractedTokens } from '../types';

const COLOR_REGEX = /(#[0-9a-fA-F]{3,8}|(rgba?|hsla?)\([^)]+\))/g;
const FONT_FAMILY_REGEX = /font-family:\s*([^;\}]+)/g;
const FONT_URL_REGEX = /@font-face\s*\{[^}]*?src:\s*url\((['"]?)(.*?)\1\)[^}]*?\}/g;
const BORDER_RADIUS_REGEX = /border-radius:\s*([^;\}]+)/g;
const GENERIC_URL_REGEX = /(?:url\(|src=|href=)(['"]?)([^"')]+\.(svg|woff2?|ttf|otf|eot))(\?[^"')]*)?\1/g;


export const extractDesignTokens = (htmlContent: string): ExtractedTokens => {
    // 1. Extract Colors
    const colors = htmlContent.match(COLOR_REGEX) || [];
    const uniqueColors = [...new Set(colors)];

    // 2. Extract Font Families
    const fontFamilies = [];
    let ffMatch;
    while ((ffMatch = FONT_FAMILY_REGEX.exec(htmlContent)) !== null) {
        const families = ffMatch[1].split(',').map(f => f.trim().replace(/['"]/g, ''));
        fontFamilies.push(...families);
    }
    const uniqueFontFamilies = [...new Set(fontFamilies)].filter(f => !/^-apple-system|BlinkMacSystemFont|Segoe UI|Roboto|Oxygen|Ubuntu|Cantarell|Fira Sans|Droid Sans|Helvetica Neue|sans-serif|serif|monospace/i.test(f));


    // 3. Extract Border Radii
    const radii = htmlContent.match(BORDER_RADIUS_REGEX) || [];
    const uniqueRadii = [...new Set(radii.map(r => r.replace('border-radius:', '').trim()))];

    // 4. Extract all potential asset URLs (fonts and icons)
    const allUrls = new Set<string>();
    let urlMatch;
    while ((urlMatch = FONT_URL_REGEX.exec(htmlContent)) !== null) {
        allUrls.add(urlMatch[2]);
    }
    while ((urlMatch = GENERIC_URL_REGEX.exec(htmlContent)) !== null) {
        allUrls.add(urlMatch[2]);
    }

    // 5. Separate fonts from icons based on file extension
    const finalFontUrls: string[] = [];
    const finalIconUrls: string[] = [];
    
    allUrls.forEach(url => {
        const cleanUrl = url.split('#')[0].split('?')[0]; // Remove hashes and query params for extension check
        if (/\.(woff2?|ttf|otf|eot)$/i.test(cleanUrl)) {
            finalFontUrls.push(url);
        } else if (/\.svg$/i.test(cleanUrl)) {
            finalIconUrls.push(url);
        }
    });

    return {
        colors: uniqueColors,
        fontFamilies: uniqueFontFamilies,
        fontUrls: [...new Set(finalFontUrls)],
        iconUrls: [...new Set(finalIconUrls)],
        borderRadii: uniqueRadii,
    };
};