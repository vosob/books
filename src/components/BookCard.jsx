import defaultImage from "/default.png";
import { renderStars } from "../helpers/createStars";

export const BookCard = ({ book, onDelete }) => {
  return (
    <li className="group w-52 bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden p-5 flex flex-col items-center text-center relative transition-all duration-300  border border-gray-100">
      <button
        onClick={() => onDelete(book._id)}
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 cursor-pointer  rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 border "
        type="button"
        aria-label="Delete book"
      >
        X
      </button>

      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl mb-4 shadow-inner group-hover:shadow-md transition-shadow duration-300">
        <img
          className="w-32 h-44 max-h-44 object-cover rounded-lg shadow-sm"
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

      <h3 className="font-bold text-lg mb-2 text-gray-800 leading-tight line-clamp-2 min-h-[3.5rem] flex items-center">
        {book.title}
      </h3>

      <p className="text-sm text-gray-600 mb-3 font-medium">by {book.author}</p>

      <div className="flex items-center gap-1 mb-3">
        {renderStars(book.rating)}
        <span className="text-xs text-gray-500 ml-1">({book.rating})</span>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-3 py-1.5 rounded-full">
        <p className="text-xs font-semibold text-blue-700">
          Year: {String(book.year).padStart(4, "0")}
        </p>
      </div>
    </li>
  );
};
