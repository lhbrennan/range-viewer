import React from 'react';
import { useStyletron } from 'baseui';
import { StatefulTooltip } from 'baseui/tooltip';

import { roundToPrecision, calcNumHandCombos, isHand } from '../utils';
import { STATUS, TOTAL_POSSIBLE_COMBOS } from '../constants';
import { HandSelectionMap } from '../types';

const calcTotalNumSelectionCombos = (handSelectionMap: HandSelectionMap) =>
  Object.entries(handSelectionMap).reduce(
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

type Props = { handSelectionMap: HandSelectionMap };
export const VisualizerInfobar = ({ handSelectionMap }: Props) => {
  const [css] = useStyletron();
  const [yesCombos, maybeCombos] = calcTotalNumSelectionCombos(handSelectionMap);
  const yesComboPercent = roundToPrecision((yesCombos / TOTAL_POSSIBLE_COMBOS) * 100, 0.01);
  const maybeComboPercent = roundToPrecision((maybeCombos / TOTAL_POSSIBLE_COMBOS) * 100, 0.01);
  const combinedWeightedPercent = roundToPrecision(
    ((yesCombos + 0.5 * maybeCombos) / TOTAL_POSSIBLE_COMBOS) * 100,
    0.01
  );

  return (
    <div className={css({ alignItems: 'flex-start', justifySelf: 'start' })}>
      <StatefulTooltip
        content={() => (
          <>
            <div>{`'Yes' combos: ${yesCombos}/${TOTAL_POSSIBLE_COMBOS} (${yesComboPercent}%)`}</div>
            <div>{`'Maybe' combos: ${maybeCombos}/${TOTAL_POSSIBLE_COMBOS} (${maybeComboPercent}%)`}</div>
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
