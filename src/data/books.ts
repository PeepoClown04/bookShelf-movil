export type ReadingStatus = 'reading' | 'read' | 'pending';
export type ReadingFilter = 'all' | ReadingStatus;

export type Book = {
  id: string;
  title: string;
  author: string;
  status: ReadingStatus;
  isbn?: string;
  cover?: 'paper' | 'green' | 'ink';
};

export const statusLabels: Record<ReadingStatus, string> = {
  reading: 'Leyendo',
  read: 'Leído',
  pending: 'Por leer',
};

export const readingFilters: { value: ReadingFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'reading', label: statusLabels.reading },
  { value: 'read', label: statusLabels.read },
  { value: 'pending', label: statusLabels.pending },
];

export const exampleBooks: Book[] = [
  { id: 'la-tregua', title: 'La tregua', author: 'Mario Benedetti', status: 'read', cover: 'paper' },
  { id: 'el-hobbit', title: 'El hobbit', author: 'J. R. R. Tolkien', status: 'reading', cover: 'green' },
  { id: 'pedro-paramo', title: 'Pedro Páramo', author: 'Juan Rulfo', status: 'read', cover: 'ink' },
];

export function filterBooks(books: Book[], filter: ReadingFilter) {
  return filter === 'all' ? books : books.filter((book) => book.status === filter);
}
