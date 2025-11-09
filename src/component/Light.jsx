export default function Light({ isLit, onClick }) {
    return (
        <button
            className={`light ${isLit ? "on" : "off"}`}
            onClick={onClick}
        ></button>
    );
}
