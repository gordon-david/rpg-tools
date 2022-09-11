import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul className="gray">
        <NavListing slug="/" title="Home" />
        <NavListing slug="/gurpscharacter" title="Gurps Character" />
        <NavListing slug="/dndcharacter" title="D&D 5E Character" />
        <NavListing slug="/dndspells" title="D&D 5E Spells" />
        <NavListing slug="/swadecharacter" title="SWADE Character" />
      </ul>
    </nav>
  );
};

function NavListing({ slug, title }: any) {
  return (
    <li>
      <Link to={slug}>{title}</Link>
    </li>
  );
}
