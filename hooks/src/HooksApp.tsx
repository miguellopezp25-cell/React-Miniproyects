import { useState } from "react";

const trafficLight = {
    red: `bg-red-500 animate-pulse`,
    yellow: `bg-yellow-500 animate-pulse`,
    green: `bg-green-500 animate-pulse`,
}

type TrafficLightColor = "red" | "yellow" | "green" 

export const TrafficLight = () => {
    const [color, setColor] = useState<TrafficLightColor>("red");

    // save previous color to avoid same color
    const handleChangeColor = (newColor: TrafficLightColor) => {
        console.log(newColor);
        setColor((prev) => {
            console.log(prev);
            return newColor;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">
                <div className={`w-32 h-32 rounded-full ${color === "red" ? trafficLight[color] : "bg-gray-700"}`}></div>
                <div className={`w-32 h-32 rounded-full ${color === "yellow" ? trafficLight[color] : "bg-gray-700"}`}></div>
                <div className={`w-32 h-32 rounded-full ${color === "green" ? trafficLight[color] : "bg-gray-700"}`}></div>

                {/* Botón para cambiar el estado de la luz */}
                <div className="flex gap-2">
                    <button onClick={() => handleChangeColor("red")}
                        className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer">
                        Rojo
                    </button>
                    <button onClick={() => handleChangeColor("yellow")}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer">
                        Amarillo
                    </button>
                    <button onClick={() => handleChangeColor("green")}
                        className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">
                        Verde
                    </button>
                </div>
            </div>
        </div>
    );
};