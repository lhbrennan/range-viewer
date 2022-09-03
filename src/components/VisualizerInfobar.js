import React from 'react';
import { useStyletron } from 'baseui';
import { StatefulTooltip } from 'baseui/tooltip';
import { roundToPrecision, calcNumHandCombos, totalPossibleCombos } from '../utils';

const calcTotalNumSelectionCombos = (handStatusMap) =>
  Object.entries(handStatusMap).reduce(
    (count, hand) => {
      const [label, status] = hand;
      if (status === 'YES') {
        count[0] = count[0] + calcNumHandCombos(label);
      } else if (status === 'MAYBE') {
        count[1] = count[1] + calcNumHandCombos(label);
      }
      return count;
    },
    [0, 0]
  );

export const VisualizerInfobar = ({ handStatusMap }) => {
  const [css] = useStyletron();
  const [yesCombos, maybeCombos] = calcTotalNumSelectionCombos(handStatusMap);
  const yesComboPercent = roundToPrecision((yesCombos / totalPossibleCombos) * 100, 0.01);
  const maybeComboPercent = roundToPrecision((maybeCombos / totalPossibleCombos) * 100, 0.01);
  const combinedWeightedPercent = roundToPrecision(
    ((yesCombos + 0.5 * maybeCombos) / totalPossibleCombos) * 100,
    0.01
  );

  return (
    <div className={css({ alignItems: 'flex-start', justifySelf: 'start' })}>
      <StatefulTooltip
        content={() => (
          <>
            <div>{`'Yes' combos: ${yesCombos}/${totalPossibleCombos} (${yesComboPercent}%)`}</div>
            <div>{`'Maybe' combos: ${maybeCombos}/${totalPossibleCombos} (${maybeComboPercent}%)`}</div>
          </>
        )}
      >
        <div>
          <div>Selected Range</div>
          <div className={css({ textAlign: 'center' })}>{`${combinedWeightedPercent}%`}</div>
        </div>
      </StatefulTooltip>
    </div>
  );
};
