import { FormControl } from "react-bootstrap";
import { useState } from "react";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function QueryParameters() {
    const [a, setA] = useState("34");
    const [b, setB] = useState("23");

    return (
        <div id="wd-query-parameters">
            <h3>Query Parameters</h3>
            <FormControl
                id="wd-query-parameter-a"
                className="mb-2"
                defaultValue={a}
                type="number"
                onChange={(e) => setA(e.target.value)}
            />
            <FormControl
                id="wd-query-parameter-b"
                className="mb-2"
                defaultValue={b}
                type="number"
                onChange={(e) => setB(e.target.value)}
            />

            <div className="d-flex gap-2 mt-2">
                <a id="wd-query-parameter-add"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
                    className="btn btn-primary">
                    Add {a} + {b}
                </a>

                <a id="wd-query-parameter-subtract"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
                    className="btn btn-danger">
                    Subtract {a} - {b}
                </a>

                <a id="wd-query-parameter-multiply"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
                    className="btn btn-success">
                    Multiply {a} * {b}
                </a>

                <a id="wd-query-parameter-divide"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
                    className="btn btn-info">
                    Divide {a} / {b}
                </a>
            </div>
            <hr />
        </div>
    );
}