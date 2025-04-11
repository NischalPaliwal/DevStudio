import { Code2, Download, Cloudy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Code from "../components/Code";
import Preview from "../components/Preview";
import Toggle from "../components/Toggle";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from 'axios';
import { Step } from "../types/type";
import { parseXML } from "../steps";

function BuilderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(true);
  const { prompt } = location.state as { prompt : string };
  const [steps, setSteps] = useState<Step[]>([]);
  
  const init = async () => {
    const response = await axios.post('http://localhost:4352/template', {
        prompt: prompt.trim()
    });
    const { prompts, uiPrompts } = response.data;

    setSteps(parseXML(uiPrompts[0]));

    // const stepsResponse = await axios.post('http://localhost:4352/chat', {
    //   messages: [...prompts, prompt].map((content) => ({
    //     role: 'user',
    //     content: content
    //   }))
    // });
    // console.log(stepsResponse.data);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Builder Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </button>
          <Button />
          <div className="p-1 flex flex-col space-y-4 justify-center">
            <Toggle setToggle={setToggle} />
          </div>
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
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex-shrink-0 overflow-y-auto">
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
        <div className="flex-1 overflow-hidden">
          {toggle ? <Code steps={steps} /> : <Preview />}
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;