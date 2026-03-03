import { useDebugValue, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  const [red, setRed] = useState(undefined);
  const [green, setGreen] = useState(undefined);
  const [blue, setBlue] = useState(undefined);
  const [rgb, setRGB] = useState("#ccc");
  const [hex, setHEX] = useState("");

  
  const handleRGB = () => {
    setRGB(`rgb(${red}, ${green}, ${blue})`)
  }

  const handleHex = () => {
    if (!red || !green || !blue) {
      return;
    }
    const newR = values[Math.floor(red / 16)] + values[red % 16];
    const newG = values[Math.floor(green / 16)] + values[green % 16];
    const newB = values[Math.floor(blue / 16)] + values[blue % 16];
    setHEX(`#${newR}${newG}${newB}`);
  }


  return (
    <div className="App" style={{ backgroundColor: rgb }}>
      <Navbar />
      <h3>{hex}</h3>
      <div className='rgbContainer'>
        <div className='inputs'>
          <input 
            placeholder='Red'
            type='number'
            value={red}
            onChange={(e) => setRed(e.target.value)}
          />
          <input 
            placeholder='Green'
            type='number'
            value={green}
            onChange={(e) => setGreen(e.target.value)}
          />
          <input 
            placeholder='Blue'
            type='number'
            value={blue}
            onChange={(e) => setBlue(e.target.value)}
          />
        </div>
        <button onClick={handleHex}>Get Hex</button>
        <button onClick={handleRGB}>Change Background</button>
      </div>

    </div>
  );
}

export default App;
