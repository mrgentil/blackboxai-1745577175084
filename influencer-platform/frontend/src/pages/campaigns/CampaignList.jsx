import React from 'react';

export default function CampaignList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Campaigns</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <p className="text-gray-600">No campaigns available</p>
        </div>
      </div>
    </div>
  );
}
