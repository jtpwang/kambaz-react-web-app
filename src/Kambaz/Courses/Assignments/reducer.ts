import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignments: [],
    assignment: null,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, { payload: assignments }) => {
            state.assignments = assignments;
        },
        addAssignment: (state, { payload: assignment }) => {
            state.assignments = [...state.assignments, assignment] as any;
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

export const { 
    setAssignments,
    addAssignment, 
    deleteAssignment, 
    updateAssignment, 
    setAssignment 
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;