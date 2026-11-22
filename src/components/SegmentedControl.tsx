import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors, font, fontSize, radius, spacing, touchTarget } from '@/constants/theme';

type Props<Value extends string> = {
  label: string;
  options: { value: Value; label: string }[];
  value: Value;
  onChange: (value: Value) => void;
};

export function SegmentedControl<Value extends string>({ label, options, value, onChange }: Props<Value>) {
  const { width, fontScale } = useWindowDimensions();
  const wrap = options.length > 2 && (width < 340 || fontScale > 1.2);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.group, wrap && styles.wrapped]}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityLabel={option.label}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => onChange(option.value)}
              style={({ pressed }) => [
                styles.option, wrap && styles.wideOption, selected && styles.selected,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.optionText, selected && styles.selectedText]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.sm },
  label: { color: colors.ink, fontFamily: font.label, fontSize: fontSize.small },
  group: { flexDirection: 'row', borderWidth: 1, borderColor: colors.border, borderRadius: radius.medium },
  wrapped: { flexWrap: 'wrap' },
  option: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: touchTarget, paddingHorizontal: spacing.xs, paddingVertical: spacing.sm, borderRadius: radius.medium },
  wideOption: { flexBasis: '50%' },
  selected: { backgroundColor: colors.ink },
  pressed: { opacity: 0.78 },
  optionText: { color: colors.ink, fontFamily: font.body, fontSize: fontSize.small, textAlign: 'center' },
  selectedText: { color: colors.white, fontFamily: font.label },
});
