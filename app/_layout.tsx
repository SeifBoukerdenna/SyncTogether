import { Stack, Slot } from "expo-router";
import { ThemeProvider } from 'src/Context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>

        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>

  );
}
