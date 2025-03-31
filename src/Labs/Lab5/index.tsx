const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";


export default function Lab5() {
    return (
        <div id="wd-lab5">
            <h2>Lab 5</h2>
            <div className="list-group">
                <a
                    href={`${REMOTE_SERVER}/lab5/welcome`}
                    className="list-group-item"
                >
                    Welcome
                </a>
            </div>
            <hr />
            <EnvironmentVariables />
            <PathParameters />
            <QueryParameters />
            <WorkingWithObjects />
            <WorkingWithArrays />
        </div>
    );
}
