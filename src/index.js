import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './App';
import { createUploadLink } from 'apollo-upload-client';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from '@apollo/client';

const httpLink=createUploadLink({
  uri:"http://localhost:3000/graphql"
})

export default new ApolloClient({
  link:httpLink,
  cache:new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);