import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDatacontext } from "../context";

const TokenCard = ({
    data: {
        collection_id,
        collection_name,
        token_id,
        token_name,
        image,
        children_count,
		type
    },
}) => {
    
    if (!collection_id) return <div className="hidden"></div>;

    const linkTo = `/visual/${token_id}`;

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-4">
            <Link to={linkTo}>
                <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                    <div className="h-2 w-full">&nbsp;</div>
                    <div className="relative pb-48 overflow-hidden">
                        <img
                            className="absolute inset-0 h-full w-full object-contain"
                            src={image.fullUrl}
                            alt=""
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="my-1 text-black font-bold">{token_name}</h2>
                            <span className="inline-block px-2 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                {type}
                            </span>
                        </div>
                        <span className="inline-block py-1 leading-none text-gray-500 uppercase tracking-wide text-xs">
                            {collection_name} ({collection_id})
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TokenCard;