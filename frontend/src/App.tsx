import { Profiler } from "react";

function App() {
  const onRender = (
    id: any,
    phase: any,
    actualDuration: any,
    baseDuration: any,
    startTime: any,
    commitTime: any
  ) => {
    console.log("phase : " , phase, "actualDuration + ", actualDuration, "baseDuration + ",baseDuration, "startTime + ",startTime, "commitTime + ",commitTime);
  };

  return (
    <Profiler id="App" onRender={onRender}>
      <div>Hello</div>
    </Profiler>
  );
}

export default App;
