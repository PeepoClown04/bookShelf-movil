import type { ComponentRef, Ref } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, font, fontSize, radius, spacing, touchTarget } from '@/constants/theme';

type Props = Pick<TextInputProps, 'value' | 'onChangeText' | 'returnKeyType' | 'onSubmitEditing'> & {
  label: string;
  error?: string;
  inputRef?: Ref<ComponentRef<typeof TextInput>>;
};

export function FormField({ label, error, inputRef, ...input }: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...input}
        ref={inputRef}
        accessibilityLabel={label}
        accessibilityHint={error}
        autoCapitalize="sentences"
        style={[styles.input, !!error && styles.invalid]}
      />
      {error ? <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.xs },
  label: { color: colors.ink, fontFamily: font.label, fontSize: fontSize.small },
  input: { color: colors.ink, fontFamily: font.body, fontSize: fontSize.body, minHeight: touchTarget, borderColor: colors.border, borderWidth: 1, borderRadius: radius.small, backgroundColor: colors.surface, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  invalid: { borderColor: colors.danger, borderWidth: 2 },
  error: { color: colors.danger, fontFamily: font.body, fontSize: fontSize.small },
});
