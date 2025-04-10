import React from "react";

const Toggle = ({ toggle, setToggle }: { toggle: boolean, setToggle: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className="flex justify-center">
            <div className="flex bg-gray-800 h-full p-2 border-x border border-gray-700 rounded-full space-x-2 justify-center">
              <div onClick={() => setToggle(!toggle)} className="bg-gray-800 border-x border border-gray-500 rounded-full py-2 px-4 hover:bg-gray-700/50 hover:ring-2">Code</div>
              <div onClick={() => setToggle(!toggle)} className="bg-gray-800 border-x border border-gray-500 rounded-full py-2 px-4 hover:bg-gray-700/50 hover:ring-2">Preview</div>
            </div>
        </div>
    );
}

export default Toggle;