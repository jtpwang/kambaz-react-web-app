import { useSelector, useDispatch } from "react-redux"; // to read/write to reducer
import { useState } from "react";
import { add } from "./addReducer";

export default function AddRedux() {
    const [a, setA] = useState(12); // a and b state variables to edit parameters to add in the reducer
    const [b, setB] = useState(23);
    const { sum } = useSelector((state: any) => state.addReducer); // read the sum state variable from the reducer
    const dispatch = useDispatch();
    return (
        <div className="w-25" id="wd-add-redux">
            <h2>Add Redux</h2>
            <h3>{a} + {b} = {sum}</h3>
            <input type="number" defaultValue={a}
                onChange={(e) => setA(parseInt(e.target.value))}
                className="form-control" />
            <input type="number" defaultValue={b}
                onChange={(e) => setB(parseInt(e.target.value))}
                className="form-control" />
            <button className="btn btn-primary" id="wd-add-redux-click"
                onClick={() => dispatch(add({ a, b }))}>
                Add Redux </button>
            <hr />
        </div>
    )
}