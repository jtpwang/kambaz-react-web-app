import { useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills" id="wd-toc">
      <li className="nav-item"><a id="wd-a" href="#/Labs" className="nav-link">Labs</a></li>

      <li className="nav-item"><a id="wd-a1" href="#/Labs/Lab1"
        className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>Lab 1</a></li>

      <li className="nav-item"><a id="wd-a2" href="#/Labs/Lab2"
        className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>Lab 2</a></li>

      <li className="nav-item"><a id="wd-a3" href="#/Labs/Lab3"
        className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>Lab 3</a></li>

      <li className="nav-item"><a id="wd-a4" href="#/Labs/Lab4"
        className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>Lab 4</a></li>

      <li className="nav-item"><a id="wd-a5" href="#/Labs/Lab5"
        className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>Lab 5</a></li>

      <li className="nav-item"><a id="wd-k" href="#/Kambaz" className="nav-link">Kambaz</a></li>

      <li className="nav-item"><a id="wd-github-web" href="https://github.com/jtpwang/kambaz-react-web-app" target="_blank"
        className="nav-link">My GitHub- web</a></li>

      <li className="nav-item"><a id="wd-github-server" href="https://github.com/jtpwang/kambaz-node-server-app" target="_blank"
        className="nav-link">My GitHub- server</a></li>

      <li className="nav-item">
        <a id="wd-server-link" href="https://kambaz-node-server-app-yh6s.onrender.com" target="_blank" className="nav-link">
          Server (Render)
        </a>
      </li>

    </ul>
  );
}
