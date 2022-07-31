import { Dimensions, Platform, PixelRatio } from 'react-native';
import * as Font from 'expo-font';

export async function loadFonts() {
  await Font.loadAsync({
    // Load a font `Montserrat` from a static resource
    OpenSans: require('../assets/OpenSans/OpenSans-Regular.ttf'),

    // Any string can be used as the fontFamily name. Here we use an object to provide more control
    'OpenSans-Regular': {
      uri: require('../assets/OpenSans/OpenSans-Regular.ttf'),
      display: Font.FontDisplay.FALLBACK,
    },
  });
}
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
export function limit (text) {
  let racouci = "";
  for (let i = 0; i < (text.length > 20 ? 20 : text.length); i++) {
    racouci = racouci.concat(text[i]);
  }
  return racouci+ (text.length > 20 ? "..." : "")
}
export function title (text) {
  let racouci = "";
  for (let i = 0; i < (text.length > 18 ? 18 : text.length); i++) {
    racouci = racouci.concat(text[i]);
  }
  return racouci+ (text.length > 18 ? "..." : "")
}