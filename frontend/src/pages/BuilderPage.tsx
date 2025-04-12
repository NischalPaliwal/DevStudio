import { Download, Cloudy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Code from "../components/Code";
import Preview from "../components/Preview";
import Toggle from "../components/Toggle";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from 'axios';
import { Step, FileItem, StepType } from "../types/type";
import { parseXML } from "../steps";
import { FileExplorer } from "../components/FileExplorer";
import { useWebContainer } from "../hooks/useWebContainer";

function BuilderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const webContainer = useWebContainer();
  const [toggle, setToggle] = useState(true);
  const { prompt } = location.state as { prompt : string };
  const [steps, setSteps] = useState<Step[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  
  const init = async () => {
    const response = await axios.post('http://localhost:4352/template', {
        prompt: prompt.trim()
    });

    const { prompts, uiPrompts } = response.data;

    setSteps(parseXML(uiPrompts[0]).map((x: Step) => ({
      ...x,
      status: "pending"
    })));

    const stepsResponse = await axios.post('http://localhost:4352/chat', {
      messages: [...prompts, prompt].map((content) => ({
        role: 'user',
        content: content
      }))
    });

    setSteps(s => [...s, ...parseXML(stepsResponse.data.response).map((x) => ({
      ...x,
      status: "pending" as "pending"
    }))]);
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    steps.filter(({status}) => status === "pending").map(step => {
      updateHappened = true;
      if (step?.type === StepType.CreateFile) {
        let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
        let currentFileStructure = [...originalFiles]; // {}
        let finalAnswerRef = currentFileStructure;
  
        let currentFolder = ""
        while(parsedPath.length) {
          currentFolder = `${currentFolder}/${parsedPath[0]}`;
          let currentFolderName = parsedPath[0];
          parsedPath = parsedPath.slice(1);
  
          if (!parsedPath.length) {
            // final file
            let file = currentFileStructure.find(x => x.path === currentFolder)
            if (!file) {
              currentFileStructure.push({
                name: currentFolderName,
                type: 'file',
                path: currentFolder,
                content: step.code
              })
            } else {
              file.content = step.code;
            }
          } else {
            /// in a folder
            let folder = currentFileStructure.find(x => x.path === currentFolder)
            if (!folder) {
              // create the folder
              currentFileStructure.push({
                name: currentFolderName,
                type: 'folder',
                path: currentFolder,
                children: []
              })
            }
  
            currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)!.children!;
          }
        }
        originalFiles = finalAnswerRef;
      }

    })

    if (updateHappened) {

      setFiles(originalFiles)
      setSteps(steps => steps.map((s: Step) => {
        return {
          ...s,
          status: "completed"
        }
        
      }))
    }
  }, [steps, files]);

  useEffect(() => {
    const createMountStructure = (files: FileItem[]): Record<string, any> => {
      const mountStructure: Record<string, any> = {};
  
      const processFile = (file: FileItem, isRootFolder: boolean) => {  
        if (file.type === 'folder') {
          // For folders, create a directory entry
          mountStructure[file.name] = {
            directory: file.children ? 
              Object.fromEntries(
                file.children.map(child => [child.name, processFile(child, false)])
              ) 
              : {}
          };
        } else if (file.type === 'file') {
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || ''
              }
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || ''
              }
            };
          }
        }
  
        return mountStructure[file.name];
      };
  
      // Process each top-level file/folder
      files.forEach(file => processFile(file, true));
  
      return mountStructure;
    };
  
    const mountStructure = createMountStructure(files);
  
    // Mount the structure if WebContainer is available
    console.log(mountStructure);
    webContainer?.mount(mountStructure);
  }, [files, webContainer]);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Builder Navigation */}
      <nav className="bg-gray-950 border-b border-gray-700 flex-shrink-0">
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
        <div className="col-span-1 w-64">
          <FileExplorer 
            files={files} 
            onFileSelect={setSelectedFile}
          />
        </div>
        {/* Code & Preview */}
        <div className="flex-1 overflow-hidden">
          {toggle ? <Code selectedFile={selectedFile} steps={steps} /> : <Preview files={files} webContainer={webContainer} />}
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;