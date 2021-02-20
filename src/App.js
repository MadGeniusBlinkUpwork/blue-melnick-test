import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';


const LevelBlock = () => < div className = "waterLevelBlock" /> ;

const App = () => {
    // Can be converted to custom hook.
    // Here can be one state is used via useReducer.
    const [isIncreaseFlag, increaseWaterLevel ] = React.useState(false);
    const [isDecreaseFlag, decreaseWaterLevel  ] = React.useState(false);
    const [levels, setLevels] = React.useState(0);

    const onIncreaseLevel = () => setLevels(() => levels + 1);
    const onDecreaseLevel = () => setLevels(() => levels - 1);

    const onIncreaseWaterLevel = () => increaseWaterLevel (true);
    const onDecreaseWaterLevel = () => decreaseWaterLevel  (true);

    // Increase Level
    React.useEffect(() => {
      let interval;
      if (isIncreaseFlag) {
        if (isDecreaseFlag) {
          increaseWaterLevel (false)
          return;
        }
        if (levels < 5)
          interval = setInterval(() => {
            onIncreaseLevel()
          }, 2000)

      }
      return () => clearInterval(interval);
    }, [isIncreaseFlag, isDecreaseFlag, levels])

    // Decrease Level
    React.useEffect(() => {
      let interval;
      if (decreaseWaterLevel ) {
        if (levels === 0 || isIncreaseFlag) {
          decreaseWaterLevel (false)
          return;
        }
        interval = setInterval(() => {
          onDecreaseLevel()
        }, 2000)
      }
      return () => clearInterval(interval);
    }, [isIncreaseFlag, isDecreaseFlag, levels])

    return ( 
      <div className = "wrapper" >
        <div className = "buttonContainer" >
          <button onClick = {onIncreaseWaterLevel} > IncreaseWaterLevel </button> 
          <button onClick = {onDecreaseWaterLevel} > DecreaseWaterLevel </button> 
        </div > 
        <div className = "waterLevelCounter" > 
          {
          Array.from({
            length: levels
            }, (_, i) => < LevelBlock key = {i} />)
          } 
        </div> 
      </div>
      );
    }

  ReactDOM.render( < App/ > , document.querySelector("#root"))

  export default App;