import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import { ProfessionProvider } from './hooks/useProfession'
import { ToastContainer } from 'react-toastify'
import { QualitiesProvider } from './hooks/useQualities'
import AuthProvider from './hooks/useAuth'
// "apiEndpoint": "http://localhost:4000/api/v1/"

const App = () => {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    )
}

export default App
