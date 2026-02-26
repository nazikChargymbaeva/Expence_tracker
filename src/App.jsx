import { addDoc, collection, getDocs } from 'firebase/firestore'
import './App.css'
import {db} from '../firebase/firebase'
import Home from './pages/Home'

function App() {
 

  return (
    <>
     <Home/>
   
    </>
  )
}

export default App
