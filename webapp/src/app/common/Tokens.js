import axios from "axios";
import { useQuery } from "react-query";
import { graphqlEndpoint, tokensQuery } from "../queries";
import EmptyState from "./EmptyState";
import Loader from "./Loader";
import TokenCard from "./TokenCard";



function Tokens({owner}) {
    const { data, isLoading, error } = useQuery("tokens", () => {
        return axios({
          url: graphqlEndpoint,
          method: "POST",
          data: {
            query: tokensQuery(owner)
          }
        }).then(response => response.data.data);
      });
    
      if (isLoading) return <Loader />;
    if (error) return <EmptyState style="mx-8" message={error.message} />;

    return (
        <div className="flex flex-wrap -mx-4">
            {/* <EmptyState
                style="mx-8"
                message="No Tokens available!"
                condition={data.collections.count === 0}
            /> */}
            {data.tokens.data.map((obj) => (
                <TokenCard key={obj.token_name} data={obj} />
            ))}
        </div>
    );
}

export default Tokens;