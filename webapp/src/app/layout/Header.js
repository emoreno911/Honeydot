import { Link } from "react-router-dom";
import { useDatacontext } from "../context";

function Header() {
    const { data:{balance} } = useDatacontext();

    return (
        <ul className="w-full fixed top-0 left-0 p-5 z-10">
            <li className="inline-block">
                <Link to="/">
                    <h3 className="text-4xl font-bold">HONEY<span className="text-pink-unique">DOT</span></h3>
                </Link>
            </li>
            <li className="inline-block">
                <span className="pl-3">
                    {balance ? `${balance.formatted} ${balance.unit}` : ""}
                </span>
            </li>
        </ul>
    )
}

export default Header;