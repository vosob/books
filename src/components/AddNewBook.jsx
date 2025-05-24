import { useState } from "react";
import { createBook } from "../api/api";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    padding: "24px",
    maxWidth: "450px",
    width: "90%",
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
  },
  overlay: {
    backgroundColor: "rgba(107, 114, 128, 0.75)",
  },
};

export const AddNewBook = ({ modalIsOpen, closeModal, onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(0);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("year", year);
    formData.append("rating", rating);
    if (image) {
      formData.append("image", image);
    }

    try {
      await createBook(formData);
      onBookAdded();
    } catch (error) {
      console.error(error);
    }

    setTitle("");
    setAuthor("");
    setYear(0);
    setRating(0);
    setImage(null);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add New Book Modal"
        ariaHideApp={false}
      >
        <div className="relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            Add New Book
          </h2>

          <form onSubmit={handleSubmitForm} className="mt-4 space-y-5">
            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none transition-all duration-200"
                id="title"
                type="text"
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="author"
              >
                Author
              </label>
              <input
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                value={author}
                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none transition-all duration-200"
                id="author"
                type="text"
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="year"
              >
                Year
              </label>
              <input
                onChange={(e) => {
                  let value = parseInt(e.target.value, 10);

                  if (isNaN(value)) {
                    setYear(""); // якщо поле очищується
                  } else if (value > 2025) {
                    setYear(2025); // авто-скидання
                  } else if (value < 0) {
                    setYear(0); // авто-скидання в мінімум
                  } else {
                    setYear(value);
                  }
                }}
                value={year}
                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none transition-all duration-200"
                id="year"
                type="number"
                min="0"
                max="2025"
                placeholder="Enter publication year"
                required
              />
            </div>

            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="rating"
              >
                Rating
              </label>
              <input
                onChange={(e) => {
                  let value = parseInt(e.target.value, 10);

                  if (isNaN(value)) {
                    setRating(""); // якщо поле очищується
                  } else if (value > 5) {
                    setRating(5); // авто-скидання
                  } else if (value < 0) {
                    setRating(0); // авто-скидання в мінімум
                  } else {
                    setRating(value);
                  }
                }}
                value={rating}
                className="w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none transition-all duration-200"
                id="rating"
                type="number"
                min="0"
                max="5"
                placeholder="Enter book rating"
                required
              />
            </div>
            {/* image */}
            <div className="relative">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="image"
              >
                Book Cover Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="customFileInput w-full cursor-pointer bg-gray-50 border border-gray-300 rounded-lg py-2 px-4"
              />
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                type="submit"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
