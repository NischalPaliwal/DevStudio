import StepCard from "../components/StepCard";
import { Step } from "../types/type";

const Code = ({ steps }: { steps: Step[] }) => {
    return (
        <div className="h-full flex bg-gray-900 overflow-hidden">
          {/* Code Area */}
          <div className="h-full w-3/4 overflow-hidden">
            <div className="h-full bg-gray-950 border border-transparent p-4 overflow-y-auto overflow-x-auto">
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
          {/* Build Steps */}
          <div className="w-1/4 border-l border-gray-700 py-4 px-3 flex flex-col h-full overflow-hidden">
            <div className="text-white text-2xl font-semibold mb-5 flex-shrink-0">Build Steps</div>
            <div className="flex flex-col space-y-4 flex-grow overflow-y-auto">
              {steps.map((step) => (
                <StepCard key={step.id} title={step.title} isCompleted={false} />
              ))}
            </div>
          </div>
        </div>
    );
}

export default Code;