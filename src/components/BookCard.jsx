import defaultImage from "/default.png";
import { renderStars } from "../helpers/createStars";

export const BookCard = ({ book, onDelete }) => {
  return (
    <li className="group w-56 bg-white shadow-sm hover:shadow-lg rounded-xl overflow-hidden p-4 flex flex-col items-center text-center relative transition-all duration-300 border border-gray-200 hover:border-gray-300">
      <button
        onClick={() => onDelete(book._id)}
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 cursor-pointer rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 bg-white border border-gray-300 hover:bg-gray-100 text-gray-600 hover:text-gray-800 shadow-sm"
        type="button"
        aria-label="Delete book"
      >
        ×
      </button>

      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg mb-3 shadow-inner group-hover:shadow transition-shadow duration-300 w-full flex justify-center">
        <img
          className="w-32 h-44 object-cover rounded-md shadow-xs transform group-hover:scale-[1.02] transition-transform duration-200"
          src={
            book.image
              ? `https://node-bookshelf-4loa.onrender.com/images/${book.image}`
              : defaultImage
          }
          alt={book.title}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      </div>

      <h3 className="font-bold text-lg mb-1.5 text-gray-800 leading-tight line-clamp-2 min-h-[3.5rem] flex items-center px-1">
        {book.title}
      </h3>

      <p className="text-sm text-gray-600 mb-3 font-medium italic">
        by {book.author}
      </p>

      <div className="flex items-center gap-1 mb-3">
        {renderStars(book.rating)}
        <span className="text-xs text-gray-500 ml-1">({book.rating})</span>
      </div>

      <div className="w-full flex flex-col gap-2 mt-auto">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 px-3 py-1 rounded-full">
          <p className="text-xs font-medium text-blue-700">
            Year: {String(book.year).padStart(4, "0")}
          </p>
        </div>

        <div
          className={`px-3 py-1 rounded-full border text-xs font-semibold ${
            book.completed
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
          }`}
        >
          {book.completed ? "Completed" : "Not completed"}
        </div>
      </div>
    </li>
  );
};
