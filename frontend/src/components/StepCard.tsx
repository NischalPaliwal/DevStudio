import { CheckCircle, Circle } from 'lucide-react';

export default function StepCard({ title, isCompleted } : { title: string, isCompleted: boolean }) {
  return (
      <div className={`rounded-lg shadow-lg p-2 transition-all duration-300 ${
        isCompleted ? 'bg-gray-800 border border-emerald-500' : 'bg-gray-900 border border-indigo-500'
      }`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div
              className="focus:outline-none transition-all duration-300"
            >
              {isCompleted ? (
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              ) : (
                <Circle className="w-8 h-8 text-indigo-400" />
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-2">
              <h3 className={`text-sm font-medium ${
                isCompleted ? 'text-emerald-200' : 'text-gray-200'
              }`}>
                {title}
              </h3>
            </div>
            
            <div className="mt-4 flex justify-end items-center">
              {isCompleted ? (
                <div className="flex items-center space-x-1 bg-emerald-800/40 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-medium text-emerald-300">Completed</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 bg-indigo-800/40 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="text-xs font-medium text-indigo-300">Pending</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}