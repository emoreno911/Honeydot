import { useParams } from "react-router-dom";
import Header from "../app/layout/Header";

function Visual() {
    const { tokenId } = useParams();
    
    return (
        <div className="h-screen">
            <Header />
            <div className="w-full flex flex-wrap">
                <div className="pt-10 pb-5 pl-8 pr-3">
                    <h3 className="text-lg mb-3">Nes3D View</h3>
                    <h4 className="text-md mb-3">TokenId: {tokenId}</h4>
                </div>
            </div>
        </div>
    )
}

export default Visual;