import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font, fontSize, radius, spacing, touchTarget } from '@/constants/theme';

export function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <View style={styles.footer}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { padding: spacing.lg, alignSelf: 'center', width: '100%', maxWidth: 632 },
  button: { minHeight: touchTarget, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.medium, padding: spacing.sm },
  pressed: { opacity: 0.8 },
  label: { color: colors.white, fontFamily: font.label, fontSize: fontSize.body, textAlign: 'center' },
});
