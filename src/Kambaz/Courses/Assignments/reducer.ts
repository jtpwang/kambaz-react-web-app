import { createSlice } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    assignments: dbAssignments,
    assignment: null,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment: any = {
                _id: uuidv4(),
                ...assignment,
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            ) as any;
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignment._id ? assignment : a
            ) as any;
        },
        setAssignment: (state, { payload: assignment }) => {
            state.assignment = assignment;
        },
    },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignment } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;