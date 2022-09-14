import React from 'react';
import { useStyletron } from 'baseui';
import { StatefulTooltip } from 'baseui/tooltip';

import { roundToPrecision, calcNumHandCombos, totalPossibleCombos, isHand } from '../utils';
import { STATUS } from '../constants/statuses';
import { HandStatusMap } from '../types';

const calcTotalNumSelectionCombos = (handStatusMap: HandStatusMap) =>
  Object.entries(handStatusMap).reduce(
    (count, entry) => {
      const [hand, status] = entry;
      // * needed for TS
      if (!isHand(hand)) {
        return count;
      }
      if (status === STATUS.yes) {
        count[0] = count[0] + calcNumHandCombos(hand);
      } else if (status === STATUS.maybe) {
        count[1] = count[1] + calcNumHandCombos(hand);
      }
      return count;
    },
    [0, 0]
  );

type Props = { handStatusMap: HandStatusMap };
export const VisualizerInfobar = ({ handStatusMap }: Props) => {
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
