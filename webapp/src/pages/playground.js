import Tokens from "../app/common/Tokens";
import Layout from "../app/layout";
import { useDatacontext } from "../app/context";
import { useState } from "react";
import ModalAbout from "../app/home/ModalAbout";

const Button = ({ children, onClick, color = 'pink' }) => (
    <button
        className={`bg-${color}-500 text-white uppercase font-bold text-sm py-3 px-6 my-3 rounded-md`}
        onClick={onClick}
    >
        {children}
    </button>
)

function Playground() {
    const {
        data: { balance },
        fn: {},
    } = useDatacontext();

    const [collectionId, setCollectionId] = useState(486);
    const [image, setImage] = useState(null);

    const handleImageChange = (image) => {
        const reader = new FileReader();
        reader.onload = function () {
            setImage(reader.result);
            
        };
        reader.readAsDataURL(image);
    };

    return (
        <Layout>
            <h2 className="text-gray-500 font-bold text-xl my-4">Playground</h2>
            <div className="w-full shadow-md border border-white bg-white rounded p-5 my-4">
                <ul className="list-decimal pl-6">
                    <li className="pb-2">
                        <span>Create a loyalty bundle NFT</span>
                    </li>
                    <li className="pb-2">
                        <span>Create a 20 pieces RFT for the bundle</span>
                    </li>
                    <li className="pb-2">
                        <span>Send n pieces to another bundle</span>
                    </li>
                    <li className="pb-2">
                        <span>Show completion status</span>
                    </li>
                </ul>
                <div className="pt-0">
                    <Button>New Loyalty Bundle</Button>
                    {" "}
                    <Button>New RFT</Button>
                    {" "}
                    <ModalAbout />
                </div>
            </div>

            <h3 className="text-gray-500 font-bold text-xl mt-4">
                <span>Tokens</span>{" "}
                <small className="text-sm">(Collection {collectionId})</small>
            </h3>
            <Tokens collectionIds={[collectionId]} />
        </Layout>
    );
}

export default Playground;
