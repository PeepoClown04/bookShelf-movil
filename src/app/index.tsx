import { router } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions, View, type ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookCard } from '@/components/BookCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SegmentedControl } from '@/components/SegmentedControl';
import { colors, font, fontSize, spacing } from '@/constants/theme';
import { filterBooks, readingFilters, type Book } from '@/data/books';
import { useCatalog } from '@/state/catalog';

const keyForBook = (book: Book) => book.id;

export default function LibraryScreen() {
  const { books: catalog, filter, setFilter } = useCatalog();
  const { width, fontScale } = useWindowDimensions();
  const columns = width >= 360 && fontScale <= 1.2 ? 3 : width >= 300 ? 2 : 1;
  const contentWidth = Math.min(width - 2 * spacing.lg, 600);
  const cardWidth = (contentWidth - (columns - 1) * spacing.md) / columns;
  const books = filterBooks(catalog, filter);
  const renderBook = useCallback<ListRenderItem<Book>>(({ item }) => (
    <BookCard
      book={item}
      width={cardWidth}
      onOpen={() => router.push({ pathname: '/libros/[id]', params: { id: item.id } })}
    />
  ), [cardWidth]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.screen}>
      <FlatList
        key={columns}
        style={styles.list}
        contentContainerStyle={styles.content}
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        data={books}
        numColumns={columns}
        keyExtractor={keyForBook}
        renderItem={renderBook}
        ListHeaderComponent={(
          <View style={styles.header}>
            <View style={styles.intro}>
              <Text accessibilityRole="header" style={styles.title}>Tu estantería</Text>
              <Text style={styles.body}>Organiza tu colección por estado de lectura.</Text>
            </View>
            <SegmentedControl label="Filtrar por estado" options={readingFilters} value={filter} onChange={setFilter} />
            <Text accessibilityLiveRegion="polite" style={styles.caption}>
              {books.length} {books.length === 1 ? 'libro' : 'libros'}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.body}>No hay libros en este estado.</Text>}
        ItemSeparatorComponent={ShelfDivider}
        ListFooterComponent={books.length > 0 ? ShelfDivider : undefined}
      />
      <PrimaryButton label="Agregar libro" onPress={() => router.push('/registrar')} />
    </SafeAreaView>
  );
}

function ShelfDivider() {
  return <View style={styles.shelf} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  list: { flex: 1, width: '100%', maxWidth: 632, alignSelf: 'center' },
  content: { padding: spacing.lg },
  header: { gap: spacing.xl, marginBottom: spacing.md },
  intro: { gap: spacing.xs, marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily: font.heading, fontSize: fontSize.title },
  body: { color: colors.ink, fontFamily: font.body, fontSize: fontSize.body },
  caption: { color: colors.muted, fontFamily: font.body, fontSize: fontSize.small },
  row: { gap: spacing.md },
  shelf: { borderTopWidth: 2, borderColor: colors.border, marginTop: spacing.md, marginBottom: spacing.lg },
});
