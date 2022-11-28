export function MultiLevelCheckbox({ level, levelUpdate, maxLevels = 1 }: any) {
  // Make selections in sequence
  // levelChanged: fn( level: int )
  //  - level: the current level of the check box, from 0 (unchecked) to 2 (both checked)

  const _levelChanged = (val: number) => {
    if (val === level && level > 0) {
      levelUpdate(level - 1);
      return;
    }
    levelUpdate(val);
  };

  return (
    <div>
      {(() => {
        const result = [];
        for (let i = 1; i <= maxLevels; i++) {
          result.push(
            <input
              key={`multi-level-${i}`}
              type="checkbox"
              checked={level >= i}
              onChange={() => _levelChanged(i)}
            />
          );
        }
        return result;
      })()}
    </div>
  );
}
