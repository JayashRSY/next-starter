import React from 'react';

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
  };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4">
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-700">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;