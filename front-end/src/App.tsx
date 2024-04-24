import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        style={{ width: 200, background: "green", color: "white", height: 50 }}
        onClick={() => setCount(count + 1)}
      >
        Contador {count}
      </button>
    </>
  );
}

export default App;
