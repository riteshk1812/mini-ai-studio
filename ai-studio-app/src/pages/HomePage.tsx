import Navbar from "../components/Navbar";
import PromptGeneration from "./PromptGeneration";

export default function HomePage() {
    console.log("token in homepage", localStorage.getItem('token'));
    return (
        <div>
            <Navbar />
            <div className="text-center mt-10 text-xl font-semibold">
                Welcome to Mini AI Studio 🎨
            </div>
            <PromptGeneration />
        </div>
    )
}
