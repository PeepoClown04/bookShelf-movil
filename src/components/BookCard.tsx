import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font, fontSize, radius, spacing } from '@/constants/theme';
import { statusLabels, type Book } from '@/data/books';

const covers = {
  paper: { background: colors.surface, spine: colors.secondary, text: colors.ink },
  green: { background: colors.primary, spine: colors.ink, text: colors.white },
  ink: { background: colors.ink, spine: colors.border, text: colors.white },
};

export function BookCard({ book, width, onOpen }: { book: Book; width: number; onOpen: () => void }) {
  return (
    <Pressable
      onPress={onOpen}
      accessibilityRole="button"
      accessibilityLabel={`Abrir ficha de ${book.title}`}
      accessibilityHint={statusLabels[book.status]}
      style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}
    >
      <BookCover book={book} />
      <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
      <Text style={styles.status}>{statusLabels[book.status]}</Text>
    </Pressable>
  );
}

export function BookCover({ book, width }: { book: Book; width?: number }) {
  const cover = covers[book.cover ?? 'paper'];

  return (
    <View style={[styles.cover, { width, backgroundColor: cover.background, borderLeftColor: cover.spine }]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Text numberOfLines={3} style={[styles.coverText, { color: cover.text }]}>{book.author || 'Autor sin registrar'}</Text>
      <Text numberOfLines={3} style={[styles.coverText, { color: cover.text }]}>{book.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.xs },
  pressed: { opacity: 0.8 },
  cover: { minHeight: 152, justifyContent: 'space-between', gap: spacing.sm, borderRadius: radius.small, borderWidth: 1, borderLeftWidth: 4, borderColor: colors.border, padding: spacing.sm },
  coverText: { fontFamily: font.body, fontSize: fontSize.small },
  title: { color: colors.ink, fontFamily: font.label, fontSize: fontSize.small },
  status: { color: colors.muted, fontFamily: font.body, fontSize: fontSize.small },
});
