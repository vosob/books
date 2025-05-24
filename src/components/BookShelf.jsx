import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetBooks, deleteBook } from "../api/api";
import { useNavigate, Navigate } from "react-router-dom";
import { BookCard } from "./BookCard";
import { AddNewBook } from "./AddNewBook";

export const BookShelf = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: books, isPending, isError, error } = useGetBooks();

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      // setArrBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      queryClient.invalidateQueries(["books"]);
    } catch (error) {
      console.error("Помилка при видаленні книги:", error);
    }
  };

  const handleBookAdded = () => {
    queryClient.invalidateQueries(["books"]);
    closeModal();
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError && error.message === "Request failed with status code 401") {
    console.log(error.message);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative flex flex-col items-center">
      <button
        className="absolute cursor-pointer top-4 right-4 px-4 py-2 bg-gray-500 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
      <h2 className="text-2xl text-center mt-4 font-semibold">Book shelf</h2>
      <div className="absolute cursor-pointer top-4 right-30 px-4 py-2 bg-gray-500 text-white rounded">
        <button className="cursor-pointer" onClick={openModal}>
          Add New Book
        </button>
        <AddNewBook
          onBookAdded={handleBookAdded}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />
      </div>
      <ul className="w-full px-32 py-6 flex flex-wrap gap-6 justify-center">
        {books.map((book) => (
          <BookCard handleDelete={handleDelete} key={book._id} book={book} />
        ))}
      </ul>
    </div>
  );
};
