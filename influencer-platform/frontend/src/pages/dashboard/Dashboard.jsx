import React from 'react';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
          <p className="text-gray-600">No active campaigns</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">No recent activity</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Stats</h2>
          <p className="text-gray-600">No stats available</p>
        </div>
      </div>
    </div>
  );
}
