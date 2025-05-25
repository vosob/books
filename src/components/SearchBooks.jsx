import { useSearch } from "../components/SearchContext";

export const SearchBooks = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <input
      className="p-2 text-sm bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors duration-200 font-medium"
      type="text"
      placeholder="Search books by title..."
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
    />
  );
};
