import {useState, Fragment} from 'react'
import logo from './logo.svg';
import './App.css';
import HeaderComp from './HeaderComp';
import LifeCycle from './LifeCycle';

function App() {

  const [msgFromChild, setMsgFromChild] = useState("")

  const receiveMessage = (message) => {
    setMsgFromChild(message)

    

  }

  return (
    <>
      <LifeCycle />
      {/* <HeaderComp sendDataToParent={receiveMessage} name="Fleet Management App" />
      {msgFromChild}
      <HeaderComp name="HR Management App" /> */}
    </>
  );
}

export default App;
