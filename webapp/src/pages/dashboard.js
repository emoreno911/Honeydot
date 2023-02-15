import { useDatacontext } from "../app/context";
import Tokens from "../app/common/Tokens";
import Layout from "../app/layout";
import EmptyState from "../app/common/EmptyState";

function Dashboard() {
    const {
        data: { accounts, currentAccountIndex },
        fn: {},
    } = useDatacontext();

    const currentAccount = accounts[currentAccountIndex];

    return (
        <Layout>
            {accounts.length < 1 ? (
                <EmptyState
                    style="mx-8"
                    message="Nothing to show here yet!"
                    condition={true}
                />
            ) : (
                <Tokens owner={currentAccount.address} />
            )}
        </Layout>
    );
}

export default Dashboard;
