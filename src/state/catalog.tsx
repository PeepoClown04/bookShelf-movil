import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { exampleBooks, type Book, type ReadingFilter } from '@/data/books';
import { changeBookStatus, makeBook, type BookDraft } from './catalogRules';

type Catalog = {
  books: Book[];
  filter: ReadingFilter;
  setFilter: (filter: ReadingFilter) => void;
  addBook: (draft: BookDraft) => boolean;
  markRead: (id: string) => void;
};

const CatalogContext = createContext<Catalog | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState(exampleBooks);
  const [filter, setFilter] = useState<ReadingFilter>('all');
  const nextId = useRef(1);

  function addBook(draft: BookDraft) {
    const book = makeBook(draft, `book-${nextId.current}`);
    if (!book) return false;

    nextId.current++;
    setBooks((current) => [book, ...current]);
    setFilter('all');
    return true;
  }

  function markRead(id: string) {
    setBooks((current) => changeBookStatus(current, id, 'read'));
  }

  return (
    <CatalogContext.Provider value={{ books, filter, setFilter, addBook, markRead }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const catalog = useContext(CatalogContext);
  if (!catalog) throw new Error('CatalogProvider is missing');
  return catalog;
}
