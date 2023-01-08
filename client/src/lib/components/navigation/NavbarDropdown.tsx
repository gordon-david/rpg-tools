import { Link } from "react-router-dom";

export const NavbarDropdown = ({
  links,
  title,
}: {
  title: string;
  links: { title: string; slug: string }[];
}) => {
  return (
    <li className="dropdown">
      <a href="javascript:void(0)" className="dropbtn">
        {title}
      </a>
      <ul className="dropdown-content gray">
        {links.map((l) => (
          <li>
            <Link to={l.slug}>{l.title}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
};
