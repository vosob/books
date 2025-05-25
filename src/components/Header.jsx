import { useAuth } from "../components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/api";

export const Header = ({ onAddBook }) => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("token");
      logout();
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <header className="w-full bg-gray-100">
        <div className="container mx-auto flex justify-center items-center p-4">
          <div className="text-gray-500">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-gray-100 shadow-sm">
      <div className="container mx-auto grid grid-cols-3 items-center p-4">
        <div className="text-lg font-semibold text-gray-600">📚 MyLibrary</div>

        <h1 className="text-2xl font-semibold text-gray-600 text-center">
          Book Shelf
        </h1>

        <div className="flex justify-end gap-4">
          {user ? (
            <>
              <button
                className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
                onClick={onAddBook}
                type="button"
              >
                Add New Book
              </button>
              <button
                className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
                onClick={handleLogout}
                type="button"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-500">Please log in</div>
          )}
        </div>
      </div>
    </header>
  );
};
