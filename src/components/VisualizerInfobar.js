import React from 'react';
import { styled } from 'styletron-react';

import {
  roundToPrecision,
  calcNumHandCombos,
  totalPossibleCombos,
} from '../utils';

const Section = styled('section', {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  maxWidth: '700px',
  margin: '0 auto',
});

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
  const [yesCombos, maybeCombos] = calcTotalNumSelectionCombos(handStatusMap);

  const yesComboPercent = roundToPrecision(
    (yesCombos / totalPossibleCombos) * 100,
    0.01
  );

  const maybeComboPercent = roundToPrecision(
    (maybeCombos / totalPossibleCombos) * 100,
    0.01
  );

  return (
    <Section>
      <div>{`'Yes' combos: ${yesCombos}/${totalPossibleCombos} (${yesComboPercent}%)`}</div>
      <div>{`'Maybe' combos: ${maybeCombos}/${totalPossibleCombos} (${maybeComboPercent}%)`}</div>
    </Section>
  );
};
