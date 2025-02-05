import { IoEllipsisVertical } from "react-icons/io5";

import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";

export default function ModuleControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <BsPlus className="fs-4 ms-2" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}