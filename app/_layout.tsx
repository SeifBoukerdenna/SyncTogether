import { Stack, Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { ThemeProvider } from 'src/Context/ThemeContext';





export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="HomePage" options={{
          headerShown: false
        }} />
      </Stack>
    </ThemeProvider>
  );
}
