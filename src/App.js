import Logo from './logos';
import './App.css';
import { useEffect, useState, useRef } from 'react';

const INNER_WIDTH = window.innerWidth
const INNER_HEIGHT = window.innerHeight

function App() {

  let mouseDragEvent = null
  const [visible, setVisible ,visibleRef] = useStateRef(false)
  const [left, setLeft, leftRef] = useStateRef(5)
  const [top, setTop, topRef] = useStateRef(5)
  const [isMouseDown, setMouseDown, mouseDownRef] = useStateRef(false)
  const [floatLocation, setFloatLocation] = useState({ left: 0, top: 0 })
  const [isFloatDragged,setFloatDrag,floatDragRef] = useStateRef(false)
  let logoRef
  const [botPosition,setBotPosition]  = useState({ left: 5, top: 5 })

  function useStateRef(initialValue) {
    const [value, setValue] = useState(initialValue);
    const ref = useRef(value);

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return [value, setValue, ref];
  }

  useEffect(() => {
    // mouseUpEvent = window.addEventListener('mouseup', handleMouseUp)
    mouseDragEvent = document.addEventListener('mousemove', handleMouseMove)
    return () => {
      // document.removeEventListener('mouseup', mouseUpEvent)
      document.removeEventListener('mousemove', mouseDragEvent)
    }
  }, [])

  const handleMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault(); 
    setFloatDrag(false)
    const floatLeft = logoRef.style.left.replace('px','') * 1 
    const floatTop = logoRef.style.top.replace('px','') * 1
    setFloatLocation({left: floatLeft, top: floatTop})
    setMouseDown(true)
  }

  const handleMouseMove = (e) => {
    e = e || window.event;
    e.preventDefault();
    if (mouseDownRef.current) {
      setVisible(false)
      setFloatDrag(true)
      setLeft(e.clientX - 25)
      setTop(e.clientY - 25)
    }
  }
  const handleMouseUp = (e) => {
    e = e || window.event;
    if (leftRef.current < (INNER_WIDTH / 2)) {
      setLeft(5)
    } else {
      setLeft(INNER_WIDTH - 50 -5)
    }
    if (topRef.current < (INNER_HEIGHT / 2)) {
      setTop(5)
    } else {
      setTop(INNER_HEIGHT - 50 -5 )
    }
    if(!floatDragRef.current) setVisible(!visibleRef.current)
    setMouseDown(false)
  }
  useEffect(() => {
    let position = {left: 0,top: 0}
    console.log('flot')
    if (floatLocation.left < INNER_WIDTH / 2) { //left
      position.left = floatLocation.left + 5
    } else {
      position.left = floatLocation.left - 300 + 50 
    }
  
    if (floatLocation.top < INNER_HEIGHT / 2) { //top
      position.top = floatLocation.top - 5
    } else {
      position.top = floatLocation.top - 600 + 50 - 15
    }
    console.log('pos',position)
    console.log('flloc',floatLocation)
    setBotPosition(position)
  },[floatLocation])
  

  return (
    <div className="App">
      <div className={`bot-wrapper ${visible ? 'show-bot' : 'hide-bot'}`} style={{ left: botPosition.left, top: botPosition.top + 60 }}>
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
        <div
          onMouseDown={handleMouseDown}
          onClick={handleMouseUp}
          onMouseUpCapture={handleMouseUp }
          className={`bot-min ${visible ? 'rotate' : ''} ${isMouseDown ? 'noTransition' : ''}`}
          style={{ left, top }}
          ref={ref => logoRef = ref}
        >
          <Logo visible={visible}></Logo>
        </div>
      </>
    </div>
  );
}

export default App;
