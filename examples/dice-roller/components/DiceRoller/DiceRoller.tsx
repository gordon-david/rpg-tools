import { SWDiceRoller } from './SWDiceRoller'
import './DiceRoller.scss'

function DiceRoller () {
    return (
        <div className='dice-roller'>
            <SWDiceRoller />
        </div>
    );
}

export { DiceRoller }
