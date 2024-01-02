import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showingAddTask }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showingAddTask ? "red" : "green"}
        text={showingAddTask ? "Close" : "Add"}
        onClick={onAdd}
      />
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
