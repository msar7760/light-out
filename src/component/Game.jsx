import { useState } from "react";
import Grid from "./Grid";

export default function Game() {
    const gridSize = 5;

    // Helper: toggle function reused for both gameplay and puzzle generation
    const toggleLights = (lights, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        return lights.map((isLit, i) => {
            const r = Math.floor(i / gridSize);
            const c = i % gridSize;
            const isNeighbor =
                (r === row && c === col) ||
                (r === row && Math.abs(c - col) === 1) ||
                (c === col && Math.abs(r - row) === 1);
            return isNeighbor ? !isLit : isLit;
        });
    };

    // Generate a SOLVABLE board
    const generateSolvableBoard = () => {
        let board = Array(gridSize * gridSize).fill(false);
        // Apply a random number of valid moves (5–15 random clicks)
        const moves = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < moves; i++) {
            const index = Math.floor(Math.random() * gridSize * gridSize);
            board = toggleLights(board, index);
        }
        return board;
    };

    // Game state
    const [history, setHistory] = useState([generateSolvableBoard()]);
    const [step, setStep] = useState(0);
    const lights = history[step];

    const handleLightClick = (index) => {
        const newLights = toggleLights(lights, index);
        const newHistory = [...history.slice(0, step + 1), newLights];
        setHistory(newHistory);
        setStep(step + 1);
    };

    const checkWin = (lights) => lights.every((light) => !light);
    const won = checkWin(lights);

    const handleReset = () => {
        const newStart = generateSolvableBoard();
        setHistory([newStart]);
        setStep(0);
    };

    const handleUndo = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="game">
            <h1>Lights Out Puzzle</h1>
            <Grid lights={lights} onLightClick={handleLightClick} />
            <div className="info">
                {won ? <p className="win">You Win!</p> : <p>Moves: {step}</p>}
            </div>
            <div className="buttons">
                <button onClick={handleReset}>New Game</button>
                <button onClick={handleUndo} disabled={step === 0}>
                    Undo
                </button>
            </div>
        </div>
    );
}
