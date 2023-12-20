import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength]=useState(8);
  const [number, setNumber]=useState(false);
  const [charecter, setCharecter]=useState(false);
  const [Password, setPassword]=useState("");

  const passref=useRef(null);

  const generate=useCallback(()=>{
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number){
      str +="0123456789"
    }
    if(charecter){
      str +="@#$%&'?!^~`"
    }
    let newpass="";
    for (let i = 1; i <= length; i++) {
      let num = Math.floor(Math.random()*str.length+1);
      newpass+= str.charAt(num)
    }
    setPassword(newpass);
  },[length,number,charecter,setPassword]);

  useEffect(()=>{
    generate();
  },[length,number,charecter,generate]);

  const copy=useCallback(()=>{
    passref.current?.select();
    window.navigator.clipboard.writeText(Password);
  },[Password])
  return (
    <>
      <h1 className='head '>Password Generator</h1>
      <div className="container bg-orange-200">
        <div className="screen">
          <input type="text" className='inputbox mt-20 ' value={Password} ref={passref} readOnly/>
          <button className='copybutton text-base pl-2 pr-2' onClick={copy}>Copy</button>
        </div>
        <div className='mt-8'>
          <input type="range" min="8" max="18" value={length} className='range cursor-pointer w-52' onChange={(e)=>{
            setLength(e.target.value)
          }}/>
          <br/>
          <label>length:{length}</label>
        </div>
        <div className='mt-6'>
          <input type="checkbox" className=' mr-2 cursor-pointer' defaultChecked={setNumber} onChange={()=>{
            setNumber((prev)=>!prev)
          }}/>
          <label>Numbers</label>
          <input type="checkbox" className=' ml-5 mr-2 cursor-pointer' defaultChecked={setCharecter} onChange={()=>{
            setCharecter((prev)=>!prev)
          }}/>
          <label>Characters</label>
        </div>
        <button className='try mt-8 text-base pl-2 pr-2' onClick={()=>{generate();}}>Regenenate</button>
      </div>
    </>
  )
}

export default App