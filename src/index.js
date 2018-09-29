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
import Header from 'components/Header'
import Content from 'components/Content'
import ActiveContent from 'components/ActiveContent'
import SideBar from 'components/SideBar'
import Dashboard from 'components/Dashboard'

// import ErrorBoundary from 'components/ErrorBoundary'

// Container
import Login from 'containers/Login'
import Home from 'containers/Home'
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
                <div className='page-container'>
                    <Header />
                    <Content>
                        <Route path='*' render={({ history }) => <SideBar history={history} />} />
                        <ActiveContent >
                            <Route exact path='/' component={Dashboard} />
                            <Route exact path='/login' component={Login} />
                        </ActiveContent>
                    </Content>
                </div>
            </Switch>
        </BrowserRouter>
        {/* </ErrorBoundary> */}
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()