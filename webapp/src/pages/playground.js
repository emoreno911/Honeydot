import { useState } from "react";
import { useDatacontext } from "../app/context";
import { ipfsBundleImage } from "../app/utils";
import Tokens from "../app/common/Tokens";
import Layout from "../app/layout";
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
        data: { accounts, currentAccountIndex },
        fn: { mintNewBundle, createRftCollection, mintRefungibleToken, getTokenInfo, nestTokens },
    } = useDatacontext();

    const [collectionId, setCollectionId] = useState(500) //useState(500); //useState(486);

    const mintNewLoyaltyBundle = () => {
        console.log("minting...", accounts[currentAccountIndex]);
        const encodedAttributes = {
            'name': `Bundle ${Math.floor(Math.random() * (9999 - 1000) + 1000)}`
          }
        mintNewBundle({}, collectionId, ipfsBundleImage)
    }

    const mintNewRFT = () => {
        console.log('minting...')
        mintRefungibleToken()
    }

    const handleNesting = () => {
        nestTokens({ 
            parentCollection: 500, 
            parentToken: 2, 
            childCollection: 523, 
            childToken: 1 
        })
    }

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
                    <Button onClick={mintNewLoyaltyBundle}>New Loyalty Bundle</Button>
                    {" "}
                    <Button color="blue" onClick={() => createRftCollection()}>New RFT Collection</Button>
                    {" "}
                    <Button color="blue" onClick={mintNewRFT}>New RFT Token</Button>
                    {" "}
                    <Button color="yellow" onClick={() => handleNesting()}>Nest Tokens</Button>
                    {" "}
                    <Button color="yellow" onClick={() => getTokenInfo()}>Get Info</Button>
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
