import {
    CREATE_NEW_PRODUCT,
    PRODUCT_CREATED_SUCCESSFULY,
    PRODUCT_CREATION_FAILD,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILD,
    GET_PRODUCT_DETAILS,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILD
 } from 'constantsTypes';


export const createProduct = product => ({
    type: CREATE_NEW_PRODUCT,
    payload: product
})

export const productCreated = product => ({
    type: PRODUCT_CREATED_SUCCESSFULY,
    payload: product
})

export const productcreatingFaild = message => ({
    type: PRODUCT_CREATION_FAILD,
    payload: message
})
export const updateProduct = product => ({
    type: UPDATE_PRODUCT,
    payload: product
})

export const productUpdatedSuccessfuly = product => ({
    type: UPDATE_PRODUCT_SUCCESS,
    payload: product
})

export const productUpdateFaild = message => ({
    type: UPDATE_PRODUCT_FAILD,
    payload: message
})

export const getProduct = id => ({
    type: GET_PRODUCT_DETAILS,
    payload: id
})

export const getProductSuccess = product => ({
    type: GET_PRODUCT_SUCCESS,
    payload: product
})

export const getProductFaild = product => ({
    type: GET_PRODUCT_FAILD,
    payload: product
})
