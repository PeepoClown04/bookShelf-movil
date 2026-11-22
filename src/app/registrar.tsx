import { router } from 'expo-router';
import { useHeaderHeight } from 'expo-router/react-navigation';
import { useRef, useState, type ComponentRef } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SegmentedControl } from '@/components/SegmentedControl';
import { colors, font, fontSize, radius, spacing } from '@/constants/theme';
import { statusLabels, type ReadingStatus } from '@/data/books';
import { useCatalog } from '@/state/catalog';

const SAMPLE_ISBN = '9789877251593';
const statusOptions: { value: ReadingStatus; label: string }[] = [
  { value: 'pending', label: statusLabels.pending },
  { value: 'reading', label: statusLabels.reading },
  { value: 'read', label: statusLabels.read },
];

export default function RegisterScreen() {
  const { addBook } = useCatalog();
  const headerHeight = useHeaderHeight();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('pending');
  const [titleError, setTitleError] = useState(false);
  const titleInput = useRef<ComponentRef<typeof TextInput>>(null);
  const authorInput = useRef<ComponentRef<typeof TextInput>>(null);

  function save() {
    if (!addBook({ title, author, status, isbn: SAMPLE_ISBN })) {
      setTitleError(true);
      titleInput.current?.focus();
      return;
    }

    Keyboard.dismiss();
    router.dismissTo('/');
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.screen}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={headerHeight} style={styles.screen}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text accessibilityRole="header" style={styles.heading}>Registrar libro</Text>
          <View style={styles.note}>
            <Text style={styles.noteTitle}>Ficha no disponible</Text>
            <Text style={styles.body}>Completa el título para guardar el libro.</Text>
          </View>
          <View style={styles.sample}>
            <Text style={styles.label}>ISBN de muestra</Text>
            <Text style={styles.sampleValue} selectable>{SAMPLE_ISBN}</Text>
          </View>
          <FormField
            label="Título · Obligatorio"
            value={title}
            inputRef={titleInput}
            onChangeText={(value) => {
              setTitle(value);
              if (value.trim()) setTitleError(false);
            }}
            error={titleError ? 'Ingresa el título del libro.' : undefined}
            returnKeyType="next"
            onSubmitEditing={() => authorInput.current?.focus()}
          />
          <FormField label="Autor · Opcional" value={author} inputRef={authorInput} onChangeText={setAuthor} returnKeyType="done" />
          <SegmentedControl label="Estado de lectura" options={statusOptions} value={status} onChange={setStatus} />
        </ScrollView>
        <PrimaryButton label="Guardar libro" onPress={save} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  scroll: { alignSelf: 'center', width: '100%', maxWidth: 632 },
  content: { padding: spacing.lg, gap: spacing.lg },
  heading: { color: colors.ink, fontFamily: font.heading, fontSize: fontSize.title },
  note: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: radius.small, gap: spacing.xs },
  noteTitle: { color: colors.warning, fontFamily: font.label, fontSize: fontSize.body },
  body: { color: colors.ink, fontFamily: font.body, fontSize: fontSize.body },
  sample: { gap: spacing.xs },
  label: { color: colors.ink, fontFamily: font.label, fontSize: fontSize.small },
  sampleValue: { color: colors.muted, fontFamily: font.body, fontSize: fontSize.body, padding: spacing.md, borderRadius: radius.small, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});
