import logo from './logo.svg';
import './App.css';
import { addDoc, collection,deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
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
      // i want to spread the values of event.data into the data object

        let data = {
            Id: false,
            Subject: false,
            StartTime: false,
            EndTime: false,
            IsAllDay: false,
            Location: false,
            Description: false,
            EndTimezone: false,
            RecurrenceRule: false,
            StartTimezone: false
         }
         let copyOfData = { ...event.data[0] };
          Object.keys(copyOfData).forEach((key) => {
            if(copyOfData[key] === null || copyOfData[key] === undefined) {
              copyOfData[key] = false;
            }
          })
         data = { ...data, ...copyOfData };
         //console.log(data);
        try {
            addDoc(docRef, data)
            
        } catch (error) {
            console.log(error)
        }
    }

    if (event.requestType === 'eventRemove') {
      //console.log(event.data);
      
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

    if(event.requestType === 'eventChange') {
      //console.log(event.data);
      const eventId = event.data.Id;
      getDocs(docRef)
      .then((snapShot)=> {
        let appointments = [];
        let appointmentIDToDelete = "";
        snapShot.docs.forEach((doc) => {
          appointments.push({...doc.data(), id: doc.id});
        })
        appointments.forEach((appointment) => {
          if(appointment.Id === eventId) {
            appointmentIDToDelete = appointment.id;
            
            //deleteDoc();
            //deleteDoc(doc(docRef.firestore, "data", appointmentIDToDelete));
          }
          else {
            appointmentIDToDelete ="";
          }
        });
        const update = doc(docRef.firestore, "data", appointmentIDToDelete)
            let copyOfData = { ...event.data };
            Object.keys(copyOfData).forEach((key) => {
              if(copyOfData[key] === null || copyOfData[key] === undefined) {
                copyOfData[key] = false;
              }
            })
            updateDoc(update, { 
              Id: copyOfData.Id,
              Subject: copyOfData.Subject,
              StartTime: copyOfData.StartTime,
              EndTime: copyOfData.EndTime,
              IsAllDay: copyOfData.IsAllDay,
              Location: copyOfData.Location,
              Description: copyOfData.Description,
              EndTimezone: copyOfData.EndTimezone,
              RecurrenceRule: copyOfData.RecurrenceRule,
              StartTimezone: copyOfData.StartTimezone
            })

      })
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
