import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
    moduleId: string; deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void
}) {

    return (
        <div className="float-end d-flex align-items-center gap-2">
            {/* Edit Module Button */}
            <FaPencil
                className="text-primary fs-5 cursor-pointer"
                onClick={() => editModule(moduleId)}
            />
            {/* Delete Module Button */}
            <FaTrash
                className="text-danger fs-5 cursor-pointer"
                onClick={() => deleteModule(moduleId)}
            />
            <GreenCheckmark />
            <BsPlus className="fs-4" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}

