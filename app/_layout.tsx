import { Stack, Slot } from "expo-router";
import { ThemeProvider } from 'src/Context/ThemeContext';

import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from 'tamagui.config'



export default function RootLayout() {
  return (
    <ThemeProvider>
      <TamaguiProvider config={tamaguiConfig}>

        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </TamaguiProvider>

    </ThemeProvider>
  );
}
