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

    const n3 = useRef(null);
    const [part3, setPart3] = useState([[]]);
    const [result3, setResult3] = useState("------");
    const p3 = useRef(null);

    const [result4, setResult4] = useState("------");
    const p4 = useRef(null);

    const style = {
        overflow: 'hidden',
        display: 'inline-block',
    }

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

    const CreateTable2 = function() {
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

    const CreateTable3 = function() {
        let n = n3.current.value;
        if (n === "") {
            return;
        }
        if (n < 1) {
            return;
        }
        let columns = [];
        for (let i = 0; i < n; i++) {
            columns.push([]);
            columns[i].push(2)
        }

        setPart3(columns);
    }

    const Check3 = function() {
        if (p3.current === null) {
            return;
        }
        let p = p3.current;

        let n = p.getWidth();

        let data = "";
        for (let i = 0; i < n-1; i++) {
            data += p.getCellValue(i, 0);
            data += ",";
        }
        data += p.getCellValue(n-1, 0);


        fetch("http://localhost:8082/api/part3", {
            method: 'POST',
            body: data
        }).then(resp => resp.text()).then(data => {
            setResult3(data)
        });
    }

    const Check4 = function() {
        if (p4.current === null) {
            return;
        }
        let p = p4.current;

        let data = "";
        for (let j = 0; j < 26; j++) {
            for (let i = 0; i < 2; i++) {
                data += p.getCellValue(i, j);
                data += ",";
            }
            data += p.getCellValue(2, j);
            data += ";";
        }
        for (let i = 0; i < 2; i++) {
            data += p.getCellValue(i, 26);
            data += ",";
        }
        data += p.getCellValue(2, 26);

        fetch("http://localhost:8082/api/part4", {
            method: 'POST',
            body: data
        }).then((response) => response.text()).catch(err => {
            setResult4("<h1>Wrong input</h1>");
            console.log("Wrong input");
        }).then(data => {
            setResult4(data);
        })
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
            <button onClick={CreateTable2} style={{margin: '10px'}}>Create</button>
        </div>
        <div>
            <div className="row">
                <div className="column">
                    <h1>RewardA</h1>
                    <div style={style}>
                        <table>
                            <tr>
                                <th>Action</th>
                                <th>Player B</th>
                            </tr>
                            <tr>
                                <th>Player A</th>
                                <td>
                                    <Matrix ref={pA2} columns={partA2} resize={'none'}></Matrix>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="column">
                    <h1>RewardB</h1>
                    <div style={style}>
                        <table>
                            <tr>
                                <th>Action</th>
                                <th>Player B</th>
                            </tr>
                            <tr>
                                <th>Player A</th>
                                <td>
                                    <Matrix ref={pB2} columns={partB2} resize={'none'}></Matrix>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <button onClick={Check2}>Check</button>
            <br/>
            <br/>
            <div>Result:</div>
            <div dangerouslySetInnerHTML={{__html: result2}}></div>
        </div>
        <h1>Part 3</h1>
        <div>
            <label>
                Number of players:
                <input ref={n3} style={{margin: '10px'}} type="text"/>
            </label>
            <br/>
            <button onClick={CreateTable3} style={{margin: '10px'}}>Create</button>
        </div>
        <div>
            <div style={style}>
                <table>
                    <tr>
                        <th></th>
                        <th>Player</th>
                    </tr>
                    <tr>
                        <th>Maximum of choice</th>
                        <td>
                            <Matrix ref={p3} columns={part3} resize={'none'}></Matrix>
                        </td>
                    </tr>
                </table>
            </div>
            <br/>
            <br/>
            <button onClick={Check3}>Check</button>
            <br/>
            <br/>
            <div>Result:</div>
            <div dangerouslySetInnerHTML={{__html: result3}}></div>
        </div>
        <h1>Part 4</h1>
        <div>
            <label>
                Number of players: 3
            </label>
        </div>
        <div>
            <div style={style}>
                <table>
                    <tr>
                        <th></th>
                        <th>Player</th>
                    </tr>
                    <tr>
                        <th>Strategy</th>
                        <td>
                            <Matrix ref={p4} columns={[[0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2],[0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2],[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2]]} resize={'none'}></Matrix>
                        </td>
                    </tr>
                </table>
            </div>
            <br/>
            <br/>
            <button onClick={Check4}>Check</button>
            <br/>
            <br/>
            <div>Result:</div>
            <div dangerouslySetInnerHTML={{__html: result4}}></div>
        </div>
    </div>
  );
}

export default App;
