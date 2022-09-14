import React from 'react';
import { styled } from 'baseui';

import { VisualizerCell } from './VisualizerCell';
import { CENTER_WIDTH } from '../constants/layout';
import { Hand, HandSelectionMap } from '../types';

const Container = styled('div', {
  height: CENTER_WIDTH,
  width: CENTER_WIDTH,
  display: 'grid',
  gridTemplateColumns: 'repeat(13, minmax(30px, 1fr))',
  gridTemplateRows: 'repeat(13, minmax(30px, 1fr))',
  gridColumnGap: '4px',
  gridRowGap: '4px',
  borderRadius: '8px',
  fontFamily: 'PT Sans, sans-serif',
});

type Props = {
  hands: Hand[];
  handSelectionMap: HandSelectionMap;
  handleSingleHandSelection: (hand: Hand) => void;
  pseudoSelectionMap: { [key in Hand]?: boolean };
};

export const VisualizerGrid = ({
  hands,
  handSelectionMap,
  handleSingleHandSelection,
  pseudoSelectionMap,
}: Props) => (
  <Container>
    {hands.map((hand) => (
      <VisualizerCell
        hand={hand}
        status={handSelectionMap[hand]}
        handleSingleHandSelection={handleSingleHandSelection}
        key={hand}
        pseudoStatus={pseudoSelectionMap[hand]}
      />
    ))}
  </Container>
);
