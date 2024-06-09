import { Stack, Slot } from "expo-router";
import { ThemeProvider } from 'src/Context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useSessionStore from "src/stores/sessionStore";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { session } = useSessionStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Stack>
          {!session ? <Stack.Screen name="LoginPage" options={{ headerShown: false }} /> :
            <>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="onBoarding" options={{ headerShown: false }} />
            </>
          }

        </Stack>
      </ThemeProvider>
    </QueryClientProvider>

  );
}
