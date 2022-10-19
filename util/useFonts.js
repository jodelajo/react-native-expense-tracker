import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

import Ionicons from '../assets/fonts/ionicons.ttf';
// import Ionicons from "@expo/vector-icons/Ionicons"

export const useResources = () => {
  const [isFontReady, setIsFontReady] = useState(false);
//   const [fontsLoaded] = Font.useFonts({
//     'Ionicons': require('../assets/fonts/ionicons.ttf'),
//   });


  const loadFontAsync = async () => {
    // console.log(fontsLoaded)
    try {
     await Font.loadAsync({
        Ionicons: {
            uri: Ionicons,
            fontDisplay: Font.FontDisplay.SWAP,
        }
      });
      // console.log('response', response)
    } catch (error) {
      console.log('Font Load Error:', error)
    } finally {
      setIsFontReady(true);
    }
  }

  useEffect(() => {
    loadFontAsync();
  }, []);

  return {
    isFontReady
  }
};