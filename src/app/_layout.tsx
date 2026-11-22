import { NotoSans_400Regular, NotoSans_600SemiBold } from '@expo-google-fonts/noto-sans';
import { NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { colors, font } from '@/constants/theme';
import { CatalogProvider } from '@/state/catalog';

export default function RootLayout() {
  const [loaded, error] = useFonts({ NotoSans_400Regular, NotoSans_600SemiBold, NotoSerif_700Bold });

  if (!loaded && !error) return null;

  return (
    <KeyboardProvider>
      <CatalogProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{
          contentStyle: { backgroundColor: colors.paper },
          headerStyle: { backgroundColor: colors.paper },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontFamily: font.label },
          headerShadowVisible: false,
        }}>
          <Stack.Screen name="index" options={{ title: 'BookShelf' }} />
          <Stack.Screen name="registrar" options={{ title: 'Registrar' }} />
          <Stack.Screen name="libros/[id]" options={{ title: 'Ficha del libro' }} />
        </Stack>
      </CatalogProvider>
    </KeyboardProvider>
  );
}
