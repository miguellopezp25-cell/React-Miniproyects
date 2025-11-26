import { useEffect, useState } from "react";

const trafficLight = {
    red: `bg-red-500 animate-pulse`,
    yellow: `bg-yellow-500 animate-pulse`,
    green: `bg-green-500 animate-pulse`,
}

type TrafficLightColor = "red" | "yellow" | "green"

export const TrafficLight2 = () => {

    const [color, setColor] = useState<TrafficLightColor>("red");
    const [countdown, setCountdown] = useState(0);
    const [maxTime, setMaxTime] = useState(0);
    
    useEffect(() => {
        if (countdown === 0) return;
        const timeLeft = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 0) return 0; // Detener en 0
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timeLeft);
    }, [countdown]);

    useEffect(() => {
        if (countdown === 0) {
            if (color === "red") {
                setCountdown(5);
                setMaxTime(5);
                setColor("green");
                return;
            } else if (color === "yellow") {
                setCountdown(3);
                setMaxTime(3);
                setColor("red");
                return;
            } else if (color === "green") {
                setCountdown(2);
                setMaxTime(2);
                setColor("yellow");
                return;
            }
        }

    }, [countdown,color]);

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-8 text-white">
            <h1 className="text-4xl font-bold text-white">Semáforo con useEffect</h1>
            <p className="text-xl">{countdown}</p>
            <progress
                value={countdown}
                max={maxTime}
                className="w-full h-4 rounded"
            ></progress>
            <div className={`w-32 h-32 rounded-full ${color === "red" ? trafficLight[color] : "bg-gray-700"} `}></div>
            <div className={`w-32 h-32 rounded-full ${color === "yellow" ? trafficLight[color] : "bg-gray-700"}`}></div>
            <div className={`w-32 h-32 rounded-full ${color === "green" ? trafficLight[color] : "bg-gray-700"}`}></div>
        </div>
    </div>
);
};