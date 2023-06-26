import React, {useRef} from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase";

export default function Home() { 
    const messageRef = useRef();
    const docRef = collection(firestore, "data") //create a collection called data

    const handleSave = async(e) => {
        e.preventDefault(); //page does not refresh
        console.log(messageRef.current.value);
        
        /* let data = {
            message: messageRef.current.value,
        } */
        let data = { 
            Id: 1,
            Subject: 'Meeting - 1',
            StartTime: new Date(2018, 1, 15, 10, 0),
            EndTime: new Date(2018, 1, 16, 12, 30),
            IsAllDay: false
        }
        try {
            addDoc(docRef, data)
            
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
        <form onSubmit={handleSave}> 
            <label>Enter message</label>
            <input type="text" name="message" ref={messageRef}/>
            <button type="submit">Submit</button>
        </form>
    </div>
    );

    
}