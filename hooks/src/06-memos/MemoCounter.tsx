import { useCounterPoke } from "@/hooks/useCounterPoke";
import { useMemo } from "react";

const heavyStuff = (iterationNumber: number) => {
  console.time("Heavy_stuff_started");

  for (let index = 0; index < iterationNumber; index++) {
    console.log("ahí vamos...");
  }

  console.timeEnd("Heavy_stuff_started");

  return `${iterationNumber} iteraciones realizadas`;
};

export const MemoCounter = () => {
  const { count, increment } = useCounterPoke(40_000);
  const { count: counter2, increment: increment2 } = useCounterPoke(10);

  const myHeavyValue = useMemo(() => heavyStuff(count), [count]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo - {myHeavyValue}</h1>
      <hr />

      <h4>Counter: {count}</h4>
      <h4>Counter2: {counter2}</h4>

      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer"
        onClick={increment}
      >
        +1
      </button>
      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer"
        onClick={increment2}
      >
        +1 - Counter2
      </button>
    </div>
  );
};
