import { Link } from "react-router-dom";
import ModalAbout from "../app/home/ModalAbout";

function Home() {
    return (
        <div className="h-screen max-w-screen-sm mx-auto flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold my-5">HONEY<span className="text-pink-unique">DOT</span></h1>
                <h2 className="text-lg font-light my-10  uppercase">Boost your brand's engagement with unique loyalty programs</h2>

                <Link to="/">
                    <span className="block bg-darkmode uppercase font-bold text-lg py-3 mb-3">Demo</span>
                </Link>
                <ModalAbout />
            </div>
        </div>
    )
}

export default Home;