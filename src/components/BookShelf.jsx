import { useQueryClient } from "@tanstack/react-query";
import { useGetBooks, deleteBook } from "../api/api";
import { Navigate } from "react-router-dom";
import { BookCard } from "./BookCard";

export const BookShelf = () => {
  const queryClient = useQueryClient();
  const { data: books, isPending, isError, error } = useGetBooks();

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      queryClient.invalidateQueries(["books"]);
    } catch (error) {
      console.error("Помилка при видаленні книги:", error);
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError && error.message === "Request failed with status code 401") {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (!books || books.length === 0) {
    return (
      <h2 className="flex justify-center items-center text-2xl font-semibold text-gray-500">
        No books found, add at least one book to make them appear.
      </h2>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <ul className="w-full px-32 py-6 flex flex-wrap gap-6 justify-center">
        {books.map((book) => (
          <BookCard handleDelete={handleDelete} key={book._id} book={book} />
        ))}
      </ul>
    </div>
  );
};
