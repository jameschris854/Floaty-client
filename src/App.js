import Logo from './logos';
import './App.css';
import { useState } from 'react';

function App() {

  const [visible, setVisible] = useState(false)

  return (
    <div className="App">
      <div className={`bot-wrapper ${visible ? 'show-bot' : 'hide-bot'}`}>
        <div className='bot-container'>
          <div className='mainBg' />
          <div className='bot-control'>
            <div onClick={() => setVisible(false)}>-</div>
          </div>
          <div className='bot-header'>
            <div>Floaty</div>
          </div>
          <div className='form-container'>
            
          </div>
        </div>
      </div>
      <>
        <div className={`bot-min ${ visible? 'rotate' : ''}`} onClick={() => setVisible(!visible)}>
          <Logo visible={visible}></Logo>
        </div>
      </>
    </div>
  );
}

export default App;
