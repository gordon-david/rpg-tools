import { ForceTokens } from './ForceTokens'
import { DicePool } from './DicePool'
import { RollResultsList } from './RollResultsList'

export function SWDiceRoller() {

    return (
        <div className="swdice-roller">
            <ForceTokens />
            <DicePool />
            <RollResultsList />
        </div>
    );
}
