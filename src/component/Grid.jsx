import Light from "./Light";

export default function Grid({ lights, onLightClick }) {
    return (
        <div className="grid">
            {lights.map((isLit, index) => (
                <Light
                    key={index}
                    isLit={isLit}
                    onClick={() => onLightClick(index)}
                />
            ))}
        </div>
    );
}
