import { CircleFadingPlus } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Button = () => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/')} className="cursor-pointer flex items-center space-x-2 bg-white border border-transparent rounded-lg py-2 px-4 text-black hover:bg-white/90">
            <span>New Chat</span><CircleFadingPlus />
        </div>
    );
}

export default Button;