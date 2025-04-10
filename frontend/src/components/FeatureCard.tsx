import React from "react";

function FeatureCard({ icon, title, description, alert }: { icon: React.ReactNode; title: string; description: string, alert: boolean }) {
  return (
    <div className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors inline-block relative">
      { alert && <span className={`animate-ping inline-flex absolute top-2 right-2 size-3 rounded-full bg-sky-500 opacity-75`}></span> }
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default FeatureCard;