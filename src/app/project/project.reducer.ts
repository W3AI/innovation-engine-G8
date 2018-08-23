import { Action } from "@ngrx/store";

import { 
    ProjectActions, 
    SET_AVAILABLE_PROJECTS,
    SET_FINISHED_PROJECTS, 
    START_PROJECT, 
    STOP_PROJECT
} from './project.actions';
import { Task } from './task.model';
import * as fromRoot from '../app.reducer';

export interface ProjectState {
    availableTasks: Task[];
    finishedTasks: Task[];
    activeProject: Task;
}

export interface State extends fromRoot.State {
    project: ProjectState;
}

const initialState: ProjectState = {
    availableTasks: [],
    finishedTasks: [],
    activeProject: null
};

export function authReducer(state = initialState, action: ProjectActions) {
    switch (action.type) {
        case SET_AVAILABLE_PROJECTS:
            return {
                ...state,
               availableTasks: action.payload
            };
            case SET_FINISHED_PROJECTS:
            return {
                ...state,
                finishedTasks: action.payload
            };
            case START_PROJECT:
            return {
                ...state,
                activeProject: action.payload
            };
            case STOP_PROJECT:
            return {
                ...state,
                activeProject: null
            };
        default: {
            return state;
        }
    }
};

export const getAvailableTasks = (state: ProjectState) => state.availableTasks;
export const getFinishedTasks = (state: ProjectState) => state.finishedTasks;
export const getActiveProject = (state: ProjectState) => state.activeProject;
