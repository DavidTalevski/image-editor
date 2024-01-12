/** @enum {string} */
const ActionManagerEvents = Object.freeze({
    ACTION_CREATED: "actionCreated",
    ACTION_EXECUTED: "actionExecuted",
    ACTION_REMOVED: "actionRemoved",
    MULTIPLE_ACTIONS_STARTED: "multipleActionsStarted",
    MULTIPLE_ACTIONS_EXECUTED: "multipleActionsExecuted",
    ACTION_UPDATE_EXECUTED: "actionUpdateStarted",
    ACTION_UPDATED: "actionUpdated"
})

export default ActionManagerEvents;