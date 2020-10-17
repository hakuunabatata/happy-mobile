import React from 'react'

import { useFonts } from 'expo-font'
import {
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito'
import Routes from './src/routes'

export default function App() {
    const [fontsLoaded] = useFonts({
        semi: Nunito_600SemiBold,
        bold: Nunito_700Bold,
        extra: Nunito_800ExtraBold,
    })

    return !fontsLoaded ? null : <Routes />
}
