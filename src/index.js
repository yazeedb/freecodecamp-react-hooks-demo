import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Counter from './Counter';
import FileUploads from './FileUploads';
import './styles.css';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Counter} />
      <Route exact path="/uploads" component={FileUploads} />
    </BrowserRouter>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
