import React from "react";
import { createStore, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// appStore will be used to maintain the global state of the application
//  it will make use of localStorage to persist the state
// More modular atoms will be used by the pages to maintain their own state,
//  and these atoms will be combined in the appStore
const appStore = createStore();

/***********************
 *** BEGIN USER STATE **
 ***********************/

interface SurvAiUser {
    username: string;
    password: string;
}

interface AllSurvAiUsers {
    users: Record<string, SurvAiUser>;
}

const userAtom = atomWithStorage<AllSurvAiUsers>("userAtom", {
    users: {},
});

// userAtom will be used to maintain the user's username, password, etc
export const getUserInfoFromStore = atom(
    null,
    (get: any, set: any, newUser: SurvAiUser) => {
        const allUsers: AllSurvAiUsers = appStore.get(userAtom);
        if (allUsers.users[newUser.username]) {
            return allUsers.users[newUser.username];
        } else {
            // throw new Error("User does not exist");
            console.log(`User ${newUser.username} does not exist`);
            return null;
        }
    }
);

export const addNewUserToStore = atom(
    null,
    (get: any, set: any, newUser: any) => {
        const allUsers = appStore.get(userAtom);
        if (!allUsers.users[newUser.username]) {
            appStore.set(userAtom, {
                users: { ...allUsers.users, [newUser.username]: newUser },
            });
        } else {
            // throw new Error("User already exists");
            console.log(`User ${newUser.username} already exists`);
        }
    }
);

/*********************
 *** END USER STATE **
 *********************/

/**********************************
 *** BEGIN SURVEY CREATION STATE **
 **********************************/

interface SurveyConfig {
    id: string;
    title: string;
    description: string;
    questions: string[];
}

interface AllSurveyConfigs {
    surveys: Record<string, SurveyConfig>;
}

// surveyConfigAtom will be used to maintain the survey creation form data
const surveyConfigAtom = atomWithStorage("surveyConfigAtom", {
    surveys: {},
});

export const getExistingSurveyConfigs = atom(
    (get) => appStore.get(surveyConfigAtom).surveys
);

export const getSurveyConfigById = atom((get: any, surveyId: any) => {
    const allSurveys: AllSurveyConfigs = appStore.get(surveyConfigAtom);
    if (allSurveys.surveys[surveyId]) {
        return allSurveys.surveys[surveyId];
    } else {
        // throw new Error("Survey does not exist");
        console.log(`Survey ${surveyId} does not exist`);
        return null;
    }
});

export const createNewSurveyConfig = atom(
    (get: any, set: any, newSurvey: any) => {
        const allSurveys: AllSurveyConfigs = appStore.get(surveyConfigAtom);
        if (!allSurveys.surveys[newSurvey.id]) {
            appStore.set(surveyConfigAtom, {
                surveys: {
                    ...allSurveys.surveys,
                    [newSurvey.id]: newSurvey,
                },
            });
        } else {
            // throw new Error("Survey already exists");
            console.log(`Survey ${newSurvey.id} already exists`);
        }
    }
);

export const deleteExistingSurveyConfig = atom(
    (get: any, set: any, surveyId: any) => {
        const allSurveys: AllSurveyConfigs = appStore.get(surveyConfigAtom);
        if (allSurveys.surveys[surveyId]) {
            delete allSurveys.surveys[surveyId];
            appStore.set(surveyConfigAtom, { surveys: allSurveys.surveys });
        } else {
            // throw new Error("Survey does not exist");
            console.log(`Survey ${surveyId} does not exist`);
        }
    }
);

export const updateExistingSurveyConfig = atom(
    (get: any, set: any, updatedSurvey: any) => {
        const allSurveys: AllSurveyConfigs = appStore.get(surveyConfigAtom);
        if (allSurveys.surveys[updatedSurvey.id]) {
            allSurveys.surveys[updatedSurvey.id] = updatedSurvey;
            appStore.set(surveyConfigAtom, {
                surveys: allSurveys.surveys,
            });
        } else {
            // throw new Error("Survey does not exist");
            console.log(`Survey ${updatedSurvey.id} does not exist`);
        }
    }
);

/********************************
 *** END SURVEY CREATION STATE **
 ********************************/

/*********************************
 *** BEGIN SURVEY RESULTS STATE **
 *********************************/

interface SurveyResults {
    id: string;
    responses: Record<string, string>;
}

interface AllSurveyResults {
    results: Record<string, SurveyResults>;
}

// surveyResultsAtom will be used to maintain the survey results
const userSurveyResultsAtom = atomWithStorage("userSurveyResultsAtom", {
    results: {},
});

export const getAllSurveyResults = atom(
    (get) => appStore.get(userSurveyResultsAtom).results
);

export const getSurveyResultsById = atom((get: any, surveyId: any) => {
    const allSurveyResults: AllSurveyResults = appStore.get(
        userSurveyResultsAtom
    );
    if (allSurveyResults.results[surveyId]) {
        return allSurveyResults.results[surveyId];
    } else {
        // throw new Error("Survey does not exist");
        console.log(`Survey ${surveyId} does not exist`);
        return null;
    }
});

export const addNewSurveyResults = atom(
    (get: any, set: any, newResults: any) => {
        const allSurveyResults: AllSurveyResults = appStore.get(
            userSurveyResultsAtom
        );
        if (!allSurveyResults.results[newResults.id]) {
            appStore.set(userSurveyResultsAtom, {
                results: {
                    ...allSurveyResults.results,
                    [newResults.id]: newResults,
                },
            });
        } else {
            // throw new Error("Survey results already exist");
            console.log(`Survey results ${newResults.id} already exist`);
        }
    }
);

export const deleteSurveyResults = atom((get: any, set: any, surveyId: any) => {
    const allSurveyResults: AllSurveyResults = appStore.get(
        userSurveyResultsAtom
    );
    if (allSurveyResults.results[surveyId]) {
        delete allSurveyResults.results[surveyId];
        appStore.set(userSurveyResultsAtom, allSurveyResults); // Updated code
    } else {
        // throw new Error("Survey results do not exist");
        console.log(`Survey results ${surveyId} do not exist`);
    }
});

/*********************************
 *** END SURVEY RESULTS STATE **
 *********************************/
