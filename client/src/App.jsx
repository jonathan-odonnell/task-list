import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './routes/home'
import Detail from './routes/detail'
import Update from './routes/update'
import { PlacesContextProvider } from './contexts/context'

const App = () => {
  return (
    <PlacesContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/places/:id' component={Detail} />
            <Route exact path='/places/:id/update' component={Update} />
          </Switch>
        </Router>
      </div>
    </PlacesContextProvider>
  )
}

export default App