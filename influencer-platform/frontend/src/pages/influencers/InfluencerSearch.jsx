import React from 'react';

export default function InfluencerSearch() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Influencers</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <input
            type="text"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Search influencers..."
          />
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">No influencers found</p>
        </div>
      </div>
    </div>
  );
}
