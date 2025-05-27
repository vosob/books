import { BookShelf } from "./BookShelf";

export const StatCard = ({ activeTab, setActiveTab }) => {
  const tabs = ["All books", "Favorites", "Statistics"];

  return (
    <>
      <div className="flex flex-col items-center gap-6 bg-gray-100 p-5 rounded-2xl w-2/3">
        <div className="flex justify-center gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === index
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div>
        {activeTab === 0 && <BookShelf />}
        {activeTab === 1 && <p>Your favorite books will be here</p>}
        {activeTab === 2 && (
          <p>
            It will contain statistics (number of books, average rating, etc.)
          </p>
        )}
      </div>
    </>
  );
};
