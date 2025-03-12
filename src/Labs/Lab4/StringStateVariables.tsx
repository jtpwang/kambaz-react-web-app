import { useState } from "react"; // import useState

export default function StringStateVariables() {
    const [firstName, setFirstName] = useState("John");
    return ( // initialize state variable
        <div>
            <h2>String State Variables</h2>
            <p>{firstName}</p>
            <input
                className="form-control"
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
            <hr />
        </div>
    )
}