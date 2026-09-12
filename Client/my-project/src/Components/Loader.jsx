import { FaSpinner } from "react-icons/fa";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <FaSpinner className="animate-spin text-4xl text-shadow-black" />
        </div>
    );
};


export default Loader;