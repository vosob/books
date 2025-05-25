import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetBooks, deleteBook } from "../api/api";
import { Navigate } from "react-router-dom";
import { BookCard } from "./BookCard";
import { useSearch } from "../components/SearchContext";

export const BookShelf = () => {
  const queryClient = useQueryClient();
  const { searchQuery } = useSearch();
  const { data: books, isPending, isError, error } = useGetBooks();

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      queryClient.invalidateQueries(["books"]);
    } catch (error) {
      console.error("Помилка при видаленні книги:", error);
      // TODO: Додати toast повідомлення про помилку
    }
  };

  const filteredBooks = useMemo(() => {
    if (!books || !searchQuery.trim()) {
      return books || [];
    }

    const lowerSearchQuery = searchQuery.toLowerCase();
    return books.filter((book) =>
      book?.title?.toLowerCase().includes(lowerSearchQuery)
    );
  }, [books, searchQuery]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center p-8">
        <div>Loading...</div>
      </div>
    );
  }

  if (isError) {
    if (error.message === "Request failed with status code 401") {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("token");
      }
      return <Navigate to="/login" replace />;
    }
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-500">Error loading books: {error.message}</div>
      </div>
    );
  }

  // Перевірка на відсутність книг
  if (!books || books.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-2xl font-semibold text-gray-500">
          No books found. Add your first book to get started!
        </p>
      </div>
    );
  }

  // Перевірка на відсутність результатів пошуку
  if (searchQuery && filteredBooks.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-2xl font-semibold text-gray-500">
          No books match your search: "{searchQuery}"
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl px-6 py-6">
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          aria-label="Books collection"
        >
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} onDelete={handleDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
};
