import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { Fragment } from 'react';
import Home from './pages/home';
const App = () => {
    return (
      <Fragment>
      <Home></Home>
      <ScheduleComponent>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
      </ScheduleComponent>
    </Fragment>);
};
export default App;
