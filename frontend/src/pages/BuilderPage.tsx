import { Code2, Download, Cloudy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Code from "../components/Code";
import Preview from "../components/Preview";
import Toggle from "../components/Toggle";
import { useState } from "react";

function BuilderPage() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Builder Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </button>
          <div className="flex items-center space-x-4">
            <button className="flex space-x-2 items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
              <span>Download</span><Download />
            </button>
            <button className="flex space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
              <span>Deploy</span><Cloudy />
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

        {/* Code & Preview */}
        <div className="flex-1 p-5 border flex flex-col space-y-4 justify-center">
          <Toggle toggle={toggle} setToggle={setToggle} />
          { toggle ? <Code /> : <Preview />}
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;