import logo from './logo.svg';
import './App.css';
import { addDoc, collection,deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { Fragment } from 'react';
import Home from './pages/home';
const App = () => {
  const docRef = collection(firestore, "data") //create a collection called data
  const onActionBegin = async (event) => {
    if (event.requestType === 'eventCreate') {
      //console.log(event.data);
        let data = { }
        try {
            addDoc(docRef, event.data[0])
            
        } catch (error) {
            console.log(error)
        }
    }

    if (event.requestType === 'eventRemove') {
      console.log(event.data);
      
      try {
        const eventId = event.data[0].Id;
        getDocs(docRef)
        .then((snapShot)=> {
          let appointments = [];
          let appointmentIDToDelete = "";
          snapShot.docs.forEach((doc) => {
            appointments.push({...doc.data(), id: doc.id});
          })
          //console.log(appointments);
          appointments.forEach((appointment) => {
            if(appointment.Id === eventId) {
              appointmentIDToDelete = appointment.id;
              //need to delete the document with the id of appointmentIDToDelete
              deleteDoc(doc(docRef.firestore, "data", appointmentIDToDelete));
              //deleteDoc(doc(docRef.firestore, "data", appointmentIDToDelete));
            }
            else {
              appointmentIDToDelete ="";
            }
          });

          //console.log(appointmentIDToDelete);
        })

      } catch (error) {
        console.log(error);
      }
    }
  }
    return (
      <Fragment>
      <Home></Home>
      <ScheduleComponent actionBegin= {onActionBegin}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
      </ScheduleComponent>
    </Fragment>);
};
export default App;
