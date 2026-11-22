import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookCover } from '@/components/BookCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, font, fontSize, radius, spacing } from '@/constants/theme';
import { statusLabels } from '@/data/books';
import { useCatalog } from '@/state/catalog';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { books, markRead, setFilter } = useCatalog();
  const book = books.find((item) => item.id === id);

  if (!book) {
    return (
      <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.screen}>
        <View style={styles.content}>
          <Text accessibilityRole="header" style={styles.title}>Libro no encontrado</Text>
        </View>
        <PrimaryButton label="Volver a la biblioteca" onPress={() => router.dismissTo('/')} />
      </SafeAreaView>
    );
  }

  const isRead = book.status === 'read';

  function showReadBooks() {
    setFilter('read');
    router.dismissTo('/');
  }

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.screen}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <BookCover book={book} width={104} />
          <View style={styles.summary}>
            <Text accessibilityRole="header" style={styles.title}>{book.title}</Text>
            <Text style={styles.body}>{book.author || 'Autor sin registrar'}</Text>
          </View>
        </View>
        <Text accessibilityRole="header" style={styles.sectionTitle}>Datos del libro</Text>
        <View style={styles.row}>
          <Text style={styles.body}>ISBN</Text>
          <Text style={styles.body}>{book.isbn ?? 'Sin registrar'}</Text>
        </View>
        <Text style={styles.label}>Estado de lectura</Text>
        <Text accessibilityLiveRegion="polite" style={styles.status}>{statusLabels[book.status]}</Text>
      </ScrollView>
      {isRead ? (
        <PrimaryButton label="Ver en la biblioteca" onPress={showReadBooks} />
      ) : (
        <PrimaryButton label="Marcar como leído" onPress={() => markRead(book.id)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  scroll: { alignSelf: 'center', width: '100%', maxWidth: 632 },
  content: { padding: spacing.lg, gap: spacing.lg },
  hero: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.lg },
  summary: { flex: 1, gap: spacing.sm },
  title: { color: colors.ink, fontFamily: font.heading, fontSize: fontSize.heading },
  sectionTitle: { color: colors.ink, fontFamily: font.heading, fontSize: fontSize.heading },
  body: { color: colors.muted, fontFamily: font.body, fontSize: fontSize.body },
  label: { color: colors.ink, fontFamily: font.label, fontSize: fontSize.body },
  row: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: spacing.sm, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, paddingVertical: spacing.md },
  status: { color: colors.ink, fontFamily: font.label, fontSize: fontSize.body, backgroundColor: colors.surface, padding: spacing.md, borderRadius: radius.small },
});
