export const BookCard = ({ book, handleDelete }) => {
  return (
    <li className="w-52 bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col items-center text-center relative hover:shadow-lg transition-shadow duration-300">
      <button
        onClick={() => {
          handleDelete(book._id);
        }}
        className="absolute top-2 right-2 cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 rounded-full w-7 h-7 flex items-center justify-center transition-colors duration-200 border border-gray-300"
        type="button"
        aria-label="Delete book"
      >
        X
      </button>

      <div className="bg-gray-100 p-2 rounded-lg mb-3 shadow-inner">
        <img
          className="w-32 h-auto max-h-44 object-contain rounded-md"
          src={
            book.image
              ? `http://localhost:8080/images/${book.image}`
              : "/default.png"
          }
          alt={book.title}
        />
      </div>

      <h3 className="font-bold text-lg mb-1 text-gray-800">{book.title}</h3>
      <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
      <div className="flex">
        <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
          Year: {String(book.year).padStart(4, "0")}
        </p>
        <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
          my-rating: {book.rating}
        </p>
      </div>
    </li>
  );
};
