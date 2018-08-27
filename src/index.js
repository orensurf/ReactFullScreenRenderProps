import React from "react";
import ReactDOM from "react-dom";
import Btn from "./Btn/Btn";
import { fsMethods } from "./withFullScreen/withFullScreen";
import WithFullScreen from "./withFullScreen/withFullScreen";
import "./styles.css";

function App() {
  const bodyRef = document.documentElement;
  return (
    <div className="App">
      <h1>With Full Screen</h1>

      <h4>Button toggle fullscreen</h4>
      <WithFullScreen
        method={fsMethods.toggleFullScreen}
        render={m => {
          return <Btn btnText="Button toggle fullscreen" click={m} />;
        }}
      />

      <h4>Html enter fullscreen</h4>
      <WithFullScreen
        method={fsMethods.enterFullScreen}
        refElement={bodyRef}
        render={m => {
          return <Btn btnText="document enter fullscreen" click={m} />;
        }}
      />

      <h4>Html exit fullscreen</h4>
      <WithFullScreen
        method={fsMethods.exitFullScreen}
        render={m => {
          return <Btn btnText="exit fullscreen" click={m} />;
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
