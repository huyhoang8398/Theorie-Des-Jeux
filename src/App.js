import './App.css';
import React, {useState, useRef, useEffect} from "react";

import Matrix from "./library/react-matrix"

function App() {
    const [result1, setResult1] = useState("------");
    const pA1 = useRef(null);
    const pB1 = useRef(null);

    const h2 = useRef(null);
    const w2 = useRef(null);
    const [partA2, setPartA2] = useState([[]]);
    const [partB2, setPartB2] = useState([[]]);
    const [result2, setResult2] = useState("------");
    const pA2 = useRef(null);
    const pB2 = useRef(null);

    const Check1 = function() {
        if (pA1.current === null || pB1.current === null) {
            return;
        }
        let a = pA1.current;
        let b = pB1.current;

        let data = a.getCellValue(0, 0) + "," + a.getCellValue(1, 0) + ";" + a.getCellValue(0, 1) + "," + a.getCellValue(1, 1)
        data += "#"
        data += b.getCellValue(0, 0) + "," + b.getCellValue(1, 0) + ";" + b.getCellValue(0, 1) + "," + b.getCellValue(1, 1)

        fetch("http://localhost:8082/api/part1", {
            method: 'POST',
            body: data
        }).then(resp => resp.text()).then(data => {
            setResult1(data)
        });
    }

    const CreateTable = function() {
        let w = w2.current.value;
        let h = h2.current.value;
        if (w === "" || h === "") {
            return;
        }
        if (w < 1 || h < 1) {
            return;
        }
        let columns = [];
        for (let i = 0; i < w; i++) {
            columns.push([]);
            for (let j = 0; j < h; j++) {
                columns[i].push(1);
            }
        }

        var newArray = columns.map(function(arr) {
            return arr.slice();
        });

        setPartA2(columns);
        setPartB2(newArray);
    }

    const Check2 = function() {
        if (pA2.current === null || pB2.current === null) {
            return;
        }
        let a = pA2.current;
        let b = pB2.current;

        let h = a.getHeight()
        let w = a.getWidth()

        let i, j;
        let left = "";
        let right = "";
        for (j = 0; j < h; j++) {
            for (i = 0; i < w-1; i++) {
                left += a.getCellValue(i, j);
                left += ",";
                right += b.getCellValue(i, j);
                right += ",";
            }
            left += a.getCellValue(w-1, j);
            left += ";";
            right += b.getCellValue(w-1, j);
            right += ";";
        }
        let data = left.substring(0, left.length-1) + "#" + right.substring(0, left.length-1);


        fetch("http://localhost:8082/api/part2", {
            method: 'POST',
            body: data
        }).then(resp => resp.text()).then(data => {
            setResult2(data)
        });
    }

    return (
    <div className="App">
        <h1>Part 1</h1>
        <div>
            <div className="row">
                <div className="column">
                    <h1>RewardA</h1>
                    <Matrix ref={pA1} columns={[[2,0], [1,1]]} resize={'none'}></Matrix>
                </div>
                <div className="column">
                    <h1>RewardB</h1>
                    <Matrix ref={pB1} columns={[[1,0], [0,2]]} resize={'none'}></Matrix>
                </div>
            </div>
            <button onClick={Check1}>Check</button>
            <br/>
            <br/>
            <div>Result:</div>
            <div dangerouslySetInnerHTML={{__html: result1}}></div>
        </div>
        <h1>Part 2</h1>
        <div>
            <label>
                Number of A's actions:
                <input ref={h2} style={{margin: '10px'}} type="text"/>
            </label>
            <br/>
            <label>
                Number of B's actions:
                <input ref={w2} style={{margin: '10px'}} type="text"/>
            </label>
            <br/>
            <button onClick={CreateTable} style={{margin: '10px'}}>Create</button>
        </div>
        <div>
            <div className="row">
                <div className="column">
                    <h1>RewardA</h1>
                    <Matrix ref={pA2} columns={partA2} resize={'none'}></Matrix>
                </div>
                <div className="column">
                    <h1>RewardB</h1>
                    <Matrix ref={pB2} columns={partB2} resize={'none'}></Matrix>
                </div>
            </div>

            <button onClick={Check2}>Check</button>
            <br/>
            <br/>
            <div>Result:</div>
            <div dangerouslySetInnerHTML={{__html: result2}}></div>
        </div>
    </div>
  );
}

export default App;
