import './App.css';
import React, {useState, useRef} from "react";

import Matrix from "./library/react-matrix"

function App() {
    const [result, setResult] = useState("------");
    const pA = useRef(null)
    const pB = useRef(null)

    const Check = function() {
        if (pA.current === null || pB.current === null) {
            return
        }
        let a = pA.current
        let b = pB.current
        let url = "http://localhost:8082/api/part1?"
        url += "A00=" + a.getCellValue(0, 0)
        url += "&A01=" + a.getCellValue(1, 0)
        url += "&A10=" + a.getCellValue(0, 1)
        url += "&A11=" + a.getCellValue(1, 1)

        url += "&B00=" + b.getCellValue(0, 0)
        url += "&B01=" + b.getCellValue(1, 0)
        url += "&B10=" + b.getCellValue(0, 1)
        url += "&B11=" + b.getCellValue(1, 1)
        fetch(url, {
            method: 'GET'
        }).then(resp => resp.text()).then(data => {
            console.log(data)
            setResult(data)
        })
    }


    return (
    <div className="App">
        <h1>Part 1</h1>
        <div className="row">
            <div className="column">
                <h1>RewardA</h1>
                <Matrix ref={pA} columns={[[2,0], [1,1]]} resize={'none'}></Matrix>
            </div>
            <div className="column">
                <h1>RewardB</h1>
                <Matrix ref={pB} columns={[[1,0], [0,2]]} resize={'none'}></Matrix>
            </div>
        </div>
        <button onClick={Check}>Check</button>
        <br/>
        <br/>
        <div>Result:</div>
        <div dangerouslySetInnerHTML={{__html: result}}></div>
    </div>
  );
}

export default App;
