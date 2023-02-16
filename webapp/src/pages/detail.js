import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDatacontext } from "../app/context";
import { fallbackNoImage } from "../app/utils";
import Layout from "../app/layout";


function Detail() {
    const {
        data: { accounts, currentAccountIndex },
        fn: { getTokenDetailInfo },
    } = useDatacontext();

    const { type, tokenInfo } = useParams();
    const [collectionId, tokenId] = tokenInfo.split('_');

    const [tokenDetail, setTokenDetail] = useState({});
    const [bundleInfo, setBundleInfo] = useState({});

    useEffect(() => {
        getDetails();
    }, [tokenInfo]);

    const getDetails = async () => {
        const {tokenDetail, bundleInfo} = await getTokenDetailInfo(collectionId, tokenId, type);
        // console.log(tokenDetail);
        // console.log(bundleInfo);
        setTokenDetail(tokenDetail);
        unroll(bundleInfo)
    }

    const unroll = (bundle) => {
        const arr =[];
        const getNodes = (children, parentCollection, parentId) => {
            children.forEach(el => {
                const {tokenId, collectionId, nestingChildTokens} = el;
                if (nestingChildTokens)
                    getNodes(nestingChildTokens, collectionId, tokenId);

                arr.push({tokenId, collectionId, parentCollection, parentId});
            })
        } 
        
        getNodes(bundle.nestingChildTokens, bundle.collectionId, bundle.tokenId);
        console.log(arr)
        setBundleInfo(arr)
        // https://github.com/vasturiano/react-force-graph
    }

    if (Object.keys(tokenDetail).length === 0) {
        return (
            <Layout>
                <div>...</div>
            </Layout>
        )
    }
    
    return (
        <Layout>
            <h2 className="text-gray-500 font-bold text-xl my-4">Token Detail</h2>
            <div className="relative w-full lg:max-w-full lg:flex my-2 p-4 shadow-md border border-white bg-white rounded my-4">
                    <div className="flex items-center bg-cover text-center overflow-hidden">
                        <img
                            src={tokenDetail.image.fullUrl || fallbackNoImage}
                            alt=""
                            className="h-72 w-auto"
                        />
                    </div>
                    <div className="pl-6 flex flex-col flex-1">
                        <div className="mb-2">
                            <span className="inline-block py-1 leading-none text-yellow-600 uppercase tracking-wide text-xs">
                                {type}
                            </span>
                            <div className="text-gray-900 font-bold text-4xl">
                                {tokenDetail.collection.tokenPrefix} #{tokenId}
                            </div>
                            <div className="my-4">
                                <span>{tokenDetail.collection.name}</span>{" "}
                                <span>({collectionId})</span>
                            </div>
                            
                            <div className="mb-1">
                                <span className="inline-block py-1 leading-none text-yellow-600 uppercase tracking-wide text-xs">
                                    Attributes
                                </span>
                            </div>
                            <table className="table- text-left">
                                <tbody>
                                    {
                                        Object.keys(tokenDetail.attributes).map(key => (
                                            <tr>
                                                <th>{tokenDetail.attributes[key].name._}</th>
                                                <td className="pl-2">
                                                    {tokenDetail.attributes[key].value._}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="w-full shadow-md border border-white bg-white rounded p-5 my-4">
                    <pre>
                        { JSON.stringify(bundleInfo, null, 2) }
                    </pre>
                </div>
        </Layout>
    )
}

export default Detail;