import React from 'react'
import ReactDOM from 'react-dom'

// Routing
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// Config
import 'config'
import rootReducer from './reducers'

// Components
// import ErrorBoundary from 'components/ErrorBoundary'

// Container
import Login from 'containers/Login'
import App from 'containers/App'
import registerServiceWorker from 'services/RegisterServiceWorker'

// Styles
import './index.css'

const store = createStore(rootReducer)
store.subscribe(() => console.log('store', store.getState()))

ReactDOM.render(
    <Provider store={store}>
        {/* <ErrorBoundary> */}
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={App} />
                    <Route path='/login' component={Login} />
                </Switch>
            </BrowserRouter>
        {/* </ErrorBoundary> */}
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()