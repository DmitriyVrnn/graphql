import React from 'react';
import Tabs from './components/Tabs';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './components/theme';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// задаем в ApolloClient конфигурацию сервера
const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
});

function App() {
  return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <Tabs/>
        </MuiThemeProvider>
      </ApolloProvider>
  );
}

export default App;
