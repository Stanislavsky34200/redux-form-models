import {createAction} from 'redux-actions'

import {CHANGE_VALUE} from './formActions'


export const ArrayOperations = {
    Remove: 'remove',
    Add: 'add',
    Swap: 'swap',
    Move: 'move',
}

export const addElement = createAction(CHANGE_VALUE, (formName, path, value = null) => ({
    formName,
    path: Array.isArray(path) ? path : [path],
    operation: ArrayOperations.Add,
    value: value,
}))

export const removeElement = createAction(CHANGE_VALUE, (formName, path, index) => ({
    formName,
    path: Array.isArray(path) ? path : [path],
    operation: ArrayOperations.Remove,
    index,
}))

export const swapElements = createAction(CHANGE_VALUE, (formName, path, aIndex, bIndex) => ({
    formName,
    path: Array.isArray(path) ? path : [path],
    operation: ArrayOperations.Swap,
    aIndex,
    bIndex,
}))

export const moveElement = createAction(CHANGE_VALUE, (formName, path, aIndex, bIndex) => ({
    formName,
    path: Array.isArray(path) ? path : [path],
    operation: ArrayOperations.Move,
    aIndex,
    bIndex,
}))
