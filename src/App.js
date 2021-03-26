import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";
import {useState, useEffect} from "react";

const url = "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

function App() {
    let message;
    const [data, setData] = useState(null);
    useEffect(_ => {
        d3.csv(url)
            .then(dataArg => {
                setData(dataArg);
            })
    }, [])
    if(data){
        message = (<>
            <div>rows: {data.length}</div>
            <div>columns: {data.columns.length}</div>
        </>)
    }else {
        message = "loading...";
    }
    return (
        <div className="App">
            {message}
            {data? JSON.stringify(data): ''}
        </div>
    );
}

export default App;
