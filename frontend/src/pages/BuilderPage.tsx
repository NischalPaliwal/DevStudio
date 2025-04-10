import { Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BuilderPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Builder Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </button>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
              Save
            </button>
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
              Deploy
            </button>
          </div>
        </div>
      </nav>

      {/* Builder Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <h2 className="text-lg font-semibold mb-4">Project Files</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
              <Code2 className="w-4 h-4" />
              <span>index.html</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
              <Code2 className="w-4 h-4" />
              <span>styles.css</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
              <Code2 className="w-4 h-4" />
              <span>app.js</span>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-gray-900">
          <div className="p-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <pre className="text-sm text-gray-300">
                <code>{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
</head>
<body>
    <h1>Welcome to DevStudio</h1>
</body>
</html>`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="w-1/3 bg-gray-800 border-l border-gray-700 p-4">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div className="bg-white rounded-lg p-4 h-full">
            <div className="text-black">
              <h1 className="text-2xl font-bold">Welcome to DevStudio</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;