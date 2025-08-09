import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'bl-black': require('@/assets/fonts/Biennale Black.otf'),
    'bl-heavyit': require('@/assets/fonts/Biennale Heavy It.otf'),
    'bl-reg': require('@/assets/fonts/Biennale Regular.otf'),
    'bl-bookit': require('@/assets/fonts/Biennale Book It.otf'),
    'bl-medit': require('@/assets/fonts/Biennale Medium It.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
