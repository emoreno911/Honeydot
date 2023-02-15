import { Link } from "react-router-dom";
import { useDatacontext } from "../app/context";
import Header from "../app/layout/Header";
import Tokens from "../app/common/Tokens";

function NavLink({ to, children }) {
    return (
        <Link to={to}>
            <div className="flex items-center text-gray-600 text-md font-bold hover:text-pink-600 mb-6">
                {children}
            </div>
        </Link>
    );
}

function SideMenu() {
    return (
        <ul className="relative list-none py-10 pl-10 mb-5">
            <li className="pt-6">
                <NavLink to="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </svg>
                    <span>Campaigns</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                        />
                    </svg>

                    <span>Customers</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                    </svg>

                    <span>Account</span>
                </NavLink>
            </li>
        </ul>
    );
}

function Dashboard() {
    const {
        data: { currentAccount },
        fn: {},
    } = useDatacontext();

    return (
        <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
            <Header />

            <div className="flex">
                <div className="w-1/5">
                    <SideMenu />
                </div>
                <div className="w-4/5 py-10 px-4">
                    {Object.keys(currentAccount).length < 1 ? (
                        <p>nothing to show yet</p>
                    ) : (
                        <div>
                            <Tokens owner={currentAccount.address} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
