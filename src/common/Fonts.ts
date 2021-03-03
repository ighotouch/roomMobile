import { Platform, Dimensions } from 'react-native';

const DEVICE_SCALE = Dimensions.get('window').width / 375;
const DEVICE_SCALE_HEIGHT = Dimensions.get('window').height / 688;

const AVERTA_BLACK = "Averta-Black";
const AVERTA_BLACK_ITALIC = "Averta-BlackItalic";
const AVERTA_BOLD = "Averta-Bold";
const AVERTA_BOLD_ITALIC = "Averta-BoldItalic";
const AVERTA_EXTRABOLD = "Averta-ExtraBold";
const AVERTA_EXTRABOLD_ITALIC = "Averta-ExtraBoldItalic";
const AVERTA_EXTRATHIN = "Averta-ExtraThin";
const AVERTA_EXTRATHIN_ITALIC = "Averta-ExtraThinItalic";
const AVERTA_LIGHT = "Averta-Light";
const AVERTA_LIGHT_ITALIC = "Averta-LightItalic";
const AVERTA_REGULAR = "Averta-Regular";
const AVERTA_REGULAR_ITALIC = "Averta-RegularItalic";
const AVERTA_SEMIBOLD = "Averta-Semibold";
const AVERTA_SEMIBOLD_ITALIC = "Averta-SemiboldItalic";
const AVERTA_THIN = "Averta-Thin";
const AVERTA_THIN_ITALIC = "Averta-ThinItalic";

function normalize(size: number): number {
    return Math.round(DEVICE_SCALE * size);
}

export default {
    AVERTA_BLACK,
    AVERTA_BLACK_ITALIC,
    AVERTA_BOLD,
    AVERTA_BOLD_ITALIC,
    AVERTA_EXTRABOLD,
    AVERTA_EXTRABOLD_ITALIC,
    AVERTA_EXTRATHIN,
    AVERTA_EXTRATHIN_ITALIC,
    AVERTA_LIGHT,
    AVERTA_LIGHT_ITALIC,
    AVERTA_REGULAR,
    AVERTA_REGULAR_ITALIC,
    AVERTA_SEMIBOLD,
    AVERTA_SEMIBOLD_ITALIC,
    AVERTA_THIN,
    AVERTA_THIN_ITALIC,
    h: (size: number): number => Math.round(DEVICE_SCALE_HEIGHT * size),
    w: normalize,
}