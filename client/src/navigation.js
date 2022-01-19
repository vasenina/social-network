import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <div className="navigation">
            <ul>
                <Link to="/">
                    <li className="nav_item">bio </li>
                </Link>

                <Link to="/friends">
                    <li className="nav_item">friends</li>
                </Link>

                <Link to="/users">
                    <li className="nav_item">people</li>
                </Link>

                <Link to="/chat">
                    <li className="nav_item">chat</li>
                </Link>
            </ul>
        </div>
    );
}
