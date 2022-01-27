interface IProps {
    displayText: string
    increment: () => void
    decrement: () => void
}

export function SteppedValue({displayText, increment, decrement} : IProps){
    return <div className="stepped-value">
        <button onClick={decrement}  className="stepped-value__decrement">-</button>
        <span className="stepped-value__display-text">{displayText}</span>
        <button  onClick={increment} className="stepped-value__increment">+</button>
    </div>
}