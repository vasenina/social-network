import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <div className="navigation">
            <ul>
                <li className="nav_item">
                    <Link to="/">bio</Link>
                </li>
                <li className="nav_item">
                    <Link to="/users">people</Link>
                </li>
            </ul>
        </div>
    );
}
