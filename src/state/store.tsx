import { createStore, atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// appStore will be used to maintain the global state of the application
//  it will make use of localStorage to persist the state
// More modular atoms will be used by the pages to maintain their own state,
//  and these atoms will be combined in the appStore
export const appStore = createStore();

/***********************
 *** BEGIN USER STATE **
 ***********************/

export interface SurvAiUser {
    username: string;
    password: string;
    remember: boolean;
    completedSurveys: SurvAiSurveyResults[];
    surveysToTake: SurvAiSurveyConfig[]; // List of survey IDs
    curveysCreated: SurvAiSurveyConfig[]; // List of survey IDs
}

interface AllSurvAiUsers {
    users: Record<string, SurvAiUser>;
}

// some sort of "authentication" to maintain the current user
const currentUserAtom = atom<SurvAiUser | null>(null);
appStore.sub(currentUserAtom, () => {
    console.log("Current user changed to", appStore.get(currentUserAtom));
});

export const getCurrentUserInStore = atom((get) => get(currentUserAtom));

export const setCurrentUserInStore = atom(
    null,
    (get: any, set: any, newUser: SurvAiUser) => {
        appStore.set(currentUserAtom, newUser);
    }
);

export const logoutCurrentUser = atom(null, (get: any, set: any) => {
    appStore.set(currentUserAtom, null);
});

export const validateUserExists = atom(
    null,
    (get: any, set: any, newUser: SurvAiUser) => {
        const allUsers: AllSurvAiUsers = appStore.get(allUsersAtom);
        if (allUsers.users[newUser.username]) {
            return true;
        } else {
            return false;
        }
    }
);

// some "database" to maintain all users
const allUsersAtom = atomWithStorage<AllSurvAiUsers>("allUsersAtom", {
    users: {},
});
appStore.sub(allUsersAtom, () => {
    console.log("All users changed to", appStore.get(allUsersAtom));
});

export const getAllUsersFromStore = atom((get) => {
    return appStore.get(allUsersAtom).users;
});

export const getUserInfoFromStore = atom(
    (get: any, set: any, newUser: SurvAiUser) => {
        const allUsers: AllSurvAiUsers = appStore.get(allUsersAtom);
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
    (get: any, set: any, newUser: SurvAiUser) => {
        const allUsers = appStore.get(allUsersAtom);
        if (!allUsers.users[newUser.username]) {
            appStore.set(allUsersAtom, {
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

export interface SurvAiSurveyConfig {
    id: string;
    title: string;
    description: string;
    questions: string[];
}

interface AllSurveyConfigs {
    surveys: Record<string, SurvAiSurveyConfig>;
}

// surveyConfigAtom will be used to maintain the survey creation form data
const surveyConfigAtom = atomWithStorage("surveyConfigAtom", {
    surveys: {},
});
appStore.sub(surveyConfigAtom, () => {
    console.log("Survey config changed to", appStore.get(surveyConfigAtom));
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
    null,
    (_get: any, _set: any, newSurvey: SurvAiSurveyConfig) => {
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
    null,
    (get: any, set: any, surveyId: string) => {
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
    null,
    (get: any, set: any, updatedSurvey: SurvAiSurveyConfig) => {
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

export interface ChatMessage {
    messageContents: string;
    sender: string;
}

export interface SurvAiChat {
    chatMessages: ChatMessage[];
}

export interface SurvAiSurveyResults {
    id: string;
    userTaker: string;
    responses: Record<string, SurvAiChat>;
}

export interface AllSurveyResults {
    allSurveys: Record<string, SurvAiSurveyResults>;
}

// surveyResultsAtom will be used to maintain the survey results
const userSurveyResultsAtom = atomWithStorage("userSurveyResultsAtom", {
    allSurveys: {},
});
appStore.sub(userSurveyResultsAtom, () => {
    console.log(
        "Survey results changed to",
        appStore.get(userSurveyResultsAtom)
    );
});

export const getAllSurveyResults = atom(
    (get) => appStore.get(userSurveyResultsAtom).allSurveys
);

export const getSurveyResultsById = atom((get: any, surveyId: string) => {
    const allSurveyResults: AllSurveyResults = appStore.get(
        userSurveyResultsAtom
    );
    if (allSurveyResults.allSurveys[surveyId]) {
        return allSurveyResults.allSurveys[surveyId];
    } else {
        // throw new Error("Survey does not exist");
        console.log(`Survey ${surveyId} does not exist`);
        return null;
    }
});

export const addNewSurveyResults = atom(
    null,
    (get: any, set: any, newResults: SurvAiSurveyResults) => {
        const currentUser = appStore.get(currentUserAtom);
        currentUser?.completedSurveys.push(newResults);

        const allSurveyResults: AllSurveyResults = appStore.get(
            userSurveyResultsAtom
        );
        if (!allSurveyResults.allSurveys[newResults.id]) {
            appStore.set(userSurveyResultsAtom, {
                allSurveys: {
                    ...allSurveyResults.allSurveys,
                    [newResults.id]: newResults,
                },
            });
        } else {
            // throw new Error("Survey results already exist");
            console.log(`Survey results ${newResults.id} already exist`);
        }
    }
);

export const deleteSurveyResults = atom(
    null,
    (get: any, set: any, surveyId: string) => {
        const currentUser = appStore.get(currentUserAtom);
        const allSurveyResults: AllSurveyResults = appStore.get(
            userSurveyResultsAtom
        );
        if (allSurveyResults.allSurveys[surveyId]) {
            delete allSurveyResults.allSurveys[surveyId];
            appStore.set(userSurveyResultsAtom, allSurveyResults); // Updated code
        } else {
            // throw new Error("Survey results do not exist");
            console.log(`Survey results ${surveyId} do not exist`);
        }
    }
);

/*********************************
 *** END SURVEY RESULTS STATE **
 *********************************/
