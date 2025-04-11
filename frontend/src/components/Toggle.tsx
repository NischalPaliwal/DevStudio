import React from "react";
import { EyeIcon, Code } from "lucide-react";

const Toggle = ({ setToggle }: { setToggle: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className="flex bg-gray-950 h-full border-x border border-gray-700 rounded-lg justify-center">
            <div onClick={() => setToggle(true)} className="flex items-center space-x-2 bg-gray-950 border border-transparent text-white rounded-lg py-2 px-4 hover:bg-white hover:text-black">
                <span>Code</span><Code />
            </div>
            <div onClick={() => setToggle(false)} className="flex items-center space-x-2 bg-gray-950 border border-transparent text-white rounded-lg py-2 px-4 hover:bg-white hover:text-black">
                <span>Preview</span><EyeIcon />
            </div>
        </div>
    );
}

export default Toggle;