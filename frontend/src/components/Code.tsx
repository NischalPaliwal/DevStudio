import StepCard from "../components/StepCard";
import { Step, FileItem } from "../types/type";
import { LampWallUp } from "lucide-react";
import { CodeEditor } from "../components/CodeEditor";

const Code = ({ steps, selectedFile }: { steps: Step[], selectedFile: FileItem | null }) => {
    return (
        <div className="h-full flex bg-gray-950 overflow-hidden">
          {/* Code Area */}
          <div className="h-full w-3/4 overflow-hidden">
            <CodeEditor file={selectedFile} />
          </div>
          {/* Build Steps */}
          <div className="w-1/4 border-l border-gray-700 py-4 px-3 flex flex-col h-full overflow-hidden">
            <div className="flex space-x-2 text-white text-lg font-semibold mb-5 flex-shrink-0">
              <LampWallUp /><span>Build Steps</span>
            </div>
            <div className="flex flex-col space-y-4 flex-grow overflow-y-auto">
              {steps.map((step) => (
                <StepCard key={step.id} title={step.title} isCompleted={step.status == "completed" ? true : false} />
              ))}
            </div>
          </div>
        </div>
    );
}

export default Code;