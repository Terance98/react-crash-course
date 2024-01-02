import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showingAddTask }) => {
  /**
   * We used the location component here since we did not want to restrict the whole header component
   * Rather just the button component
   * If we wanted to restrict the whole header, then we could have included the Header also in the Route code for '/'
   */
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showingAddTask ? "red" : "green"}
          text={showingAddTask ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

/**
 * CSS in React Component
 */
// const headingStyle = {
//   color: "red",
//   background: "black",
// };

export default Header;