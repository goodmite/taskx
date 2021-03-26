import {useState} from 'react'
import './App.css';

function App() {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const handleMouseMove = e => {
        setMousePosition({x: e.clientX, y: e.clientY});
    }
    return (
        <div className="App" onMouseMove={_ => handleMouseMove(_)}>
            <svg width={300} height={300}>
                <circle fill={'yellow'} r={10} cy={mousePosition.y} cx={mousePosition.x}/>
            </svg>
        </div>
    );
}

export default App;
