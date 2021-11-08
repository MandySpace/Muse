import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({ dispLib, setDispLib }) {
  return (
    <nav className="nav">
      <h1>Muse</h1>
      <form action="#">
        <input type="checkbox" id="lib-toggle" />
        <label htmlFor="lib-toggle" onClick={() => setDispLib(!dispLib)}>
          <FontAwesomeIcon size="2x" icon={faMusic} />
        </label>
      </form>
    </nav>
  );
}

export default Nav;
