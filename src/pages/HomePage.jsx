export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        📚 Welcome to Your Reading Tracker!
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card: Stats */}
        <div className="rounded-2xl shadow-md p-6 bg-white">
          <h2 className="text-xl font-semibold mb-2">📈 Your Reading Stats</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              Books read: <span className="font-bold">12</span>
            </li>
            <li>
              Average rating: <span className="font-bold">4.3⭐</span>
            </li>
            <li>
              Currently reading: <span className="font-bold">2</span>
            </li>
          </ul>
        </div>

        {/* Card: Quote or Recommendation */}
        <div className="rounded-2xl shadow-md p-6 bg-white">
          <h2 className="text-xl font-semibold mb-2">📖 Book of the Day</h2>
          <p className="italic text-gray-600">
            “A reader lives a thousand lives before he dies . . . The man who
            never reads lives only one.”
          </p>
          <p className="text-sm text-right mt-2 text-gray-500">
            — George R.R. Martin
          </p>
        </div>
      </div>

      {/* Reading Goals */}
      <div className="mt-10 rounded-2xl shadow-md p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">🎯 Your Reading Goals</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Read 20 books this year</li>
          <li>Finish current book by the end of the week</li>
          <li>Leave a review after each finished book</li>
        </ul>
      </div>
    </div>
  );
};
