export default function Header({ first, last }) {
    return (
        <div className="header">
            <h1>Social Network</h1>
            <div>
                {first} {last}
            </div>
        </div>
    );
}
