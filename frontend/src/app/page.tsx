'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Travel Planner</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Travel Planner</h2>
          <p className="text-lg text-gray-600 mb-6">
            Plan your next adventure with ease. Create trips, manage bookings, and stay organized.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Trips</h3>
              <p className="text-gray-600">
                Organize all your travel plans in one place with detailed itineraries.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Bookings</h3>
              <p className="text-gray-600">
                Keep track of flights, hotels, transportation, and activities.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sync Calendar</h3>
              <p className="text-gray-600">
                Automatically sync your itinerary with Google Calendar.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h3>
          <ol className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</span>
              <span>Create a new trip with start and end dates</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</span>
              <span>Add cities you'll be visiting</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</span>
              <span>Add flights, hotels, and activities</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</span>
              <span>View your complete itinerary</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">5</span>
              <span>Sync with Google Calendar</span>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
