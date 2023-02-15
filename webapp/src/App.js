import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import DataContextProvider from './app/context';
import Visual from './pages/visual';
import Home from './pages/home';
import Dashboard from './pages/dashboard';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <DataContextProvider>
          <HashRouter>
              <Switch>
                  <Route path="/" exact render={props => <Home {...props} />} />
                  <Route path="/visual/:tokenId?" render={(props) => <Visual {...props} />} />
                  <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
              </Switch>
          </HashRouter>
      </DataContextProvider>
    </QueryClientProvider>
  );
}

export default App;
