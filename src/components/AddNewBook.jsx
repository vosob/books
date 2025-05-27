import { useForm } from "react-hook-form";
import { TailwindModal } from "./TailwindModal";
import { useCreateBook } from "../hooks/useCreateBook";

export const AddNewBook = ({ modalIsOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      year: new Date().getFullYear(),
      rating: 0,
      image: null,
      completed: false,
    },
  });

  const { mutate, isLoading, error } = useCreateBook({
    onSuccess: () => {
      reset();
      closeModal();
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title.trim());
    formData.append("author", data.author.trim());
    formData.append("year", data.year.toString());
    formData.append("rating", data.rating.toString());
    formData.append("completed", data.completed ? "true" : "false");

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    mutate(formData);
  };

  const handleCancel = () => {
    reset();
    closeModal();
  };

  const isFormDisabled = isLoading || isSubmitting;

  return (
    <TailwindModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Add New Book Modal"
      ariaHideApp={false}
    >
      <div className="relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          Add New Book
        </h2>

        {/* Global error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">
              {error.message || "Failed to create book. Please try again."}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
          {/* Title */}
          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="title"
            >
              Title *
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Title cannot exceed 200 characters",
                },
              })}
              className={`w-full py-2 px-4 bg-gray-50 border ${
                errors.title ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none transition-all duration-200`}
              id="title"
              type="text"
              placeholder="Enter book title"
              disabled={isFormDisabled}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="author"
            >
              Author *
            </label>
            <input
              {...register("author", {
                required: "Author is required",
                minLength: {
                  value: 2,
                  message: "Author name must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Author name cannot exceed 100 characters",
                },
              })}
              className={`w-full py-2 px-4 bg-gray-50 border ${
                errors.author ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none transition-all duration-200`}
              id="author"
              type="text"
              placeholder="Enter author name"
              disabled={isFormDisabled}
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Year */}
          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="year"
            >
              Publication Year *
            </label>
            <input
              {...register("year", {
                required: "Publication year is required",
                min: { value: 1, message: "Year must be at least 1" },
                max: {
                  value: new Date().getFullYear() + 1,
                  message: `Year cannot exceed ${new Date().getFullYear() + 1}`,
                },
                valueAsNumber: true,
              })}
              className={`w-full py-2 px-4 bg-gray-50 border ${
                errors.year ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none transition-all duration-200`}
              id="year"
              type="number"
              min="1"
              max={new Date().getFullYear() + 1}
              placeholder="Enter publication year"
              disabled={isFormDisabled}
            />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
            )}
          </div>

          {/* Rating */}
          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="rating"
            >
              Rating * (0-5)
            </label>
            <input
              {...register("rating", {
                required: "Rating is required",
                min: { value: 0, message: "Rating must be at least 0" },
                max: { value: 5, message: "Rating cannot exceed 5" },
                valueAsNumber: true,
              })}
              className={`w-full py-2 px-4 bg-gray-50 border ${
                errors.rating ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none transition-all duration-200`}
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Enter book rating (0-5)"
              disabled={isFormDisabled}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="image"
            >
              Book Cover Image
            </label>
            <input
              {...register("image", {
                validate: {
                  fileSize: (files) => {
                    if (!files?.[0]) return true;
                    return (
                      files[0].size <= 5 * 1024 * 1024 ||
                      "File size must be less than 5MB"
                    );
                  },
                  fileType: (files) => {
                    if (!files?.[0]) return true;
                    const allowedTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/webp",
                    ];
                    return (
                      allowedTypes.includes(files[0].type) ||
                      "Only JPEG, PNG, and WebP files are allowed"
                    );
                  },
                },
              })}
              type="file"
              id="image"
              accept="image/jpeg,image/png,image/webp"
              className={`w-full cursor-pointer bg-gray-50 border ${
                errors.image ? "border-red-300" : "border-gray-300"
              } rounded-lg py-2 px-4`}
              disabled={isFormDisabled}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Optional. Supported formats: JPEG, PNG, WebP. Max size: 5MB.
            </p>
          </div>

          {/* Completed */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              {...register("completed")}
              className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 focus:ring-2"
              disabled={isFormDisabled}
            />
            <label htmlFor="completed" className="ml-2 text-sm text-gray-700">
              Mark as completed
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end pt-4 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              disabled={isFormDisabled}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              type="submit"
              disabled={isFormDisabled}
            >
              {isLoading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </TailwindModal>
  );
};
