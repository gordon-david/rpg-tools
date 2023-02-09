import { Link } from "react-router-dom";

export function Header() {
    return <div className="header">
            <Link className="header__link" to="/">Home</Link>
            <Link className="header__link" to="/about">About</Link>
            <Link className="header__link" to="/diceroller">Dice Roller</Link>
    </div>
}