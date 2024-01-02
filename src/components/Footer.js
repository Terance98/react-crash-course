import { Link } from "react-router-dom";

/**
 * Difference between a tag and link tag
 * The link tag will not do page reload, therefore API calls also won't be made, meaning any changes done in the db won't be reflected
 * The a tag will do the page reload, the changes will be reflected. But the UX is not that great since page reload takes time 
 */
const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2023</p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;
