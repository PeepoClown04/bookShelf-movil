import type { Book, ReadingStatus } from '@/data/books';

export type BookDraft = Pick<Book, 'title' | 'author' | 'isbn' | 'status'>;

export function makeBook(draft: BookDraft, id: string): Book | null {
  const title = draft.title.trim();
  if (!title) return null;

  return { id, title, author: draft.author.trim(), isbn: draft.isbn?.trim() || undefined, status: draft.status };
}

export function changeBookStatus(books: Book[], id: string, status: ReadingStatus) {
  return books.map((book) => book.id === id ? { ...book, status } : book);
}
