import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import DataContextProvider from './app/context';
import Detail from './pages/detail';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Playground from './pages/playground';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <DataContextProvider>
          <HashRouter>
              <Switch>
                  <Route path="/" exact render={props => <Home {...props} />} />
                  <Route path="/detail/:type?/:tokenInfo?" render={(props) => <Detail {...props} />} />
                  <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
                  <Route path="/playground" render={(props) => <Playground {...props} />} />
              </Switch>
          </HashRouter>
      </DataContextProvider>
    </QueryClientProvider>
  );
}

export default App;
