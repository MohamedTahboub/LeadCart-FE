import customers from './customers'
import orders from './orders'
import subscriptions from './subscriptions'
import { combineReducers } from 'redux'

export default combineReducers({
    customers,
    orders,
    subscriptions
})
