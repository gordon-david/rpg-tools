export interface DiceProps {
    displayName: string,
    diceType: string,
    amount: number,
    increment: () => void
}

/*
   Displays a dice button,
   with an amount and displayname.
   Accepts a callback for incrementing the amount
   of dice displayed.
*/
export function Dice({
    displayName,
    diceType,
    amount,
    increment }: DiceProps) {

    return (
        <div
            className="dice"
            id={diceType}>
            <button
                className='dice__btn'
                onClick={increment}
            >
                {displayName}
            </button>
            <div className='dice__amount'>
                {amount}
            </div>
        </div>
    );
}
