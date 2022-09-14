import React from 'react';
import { styled } from 'baseui';

import { VisualizerCell } from './VisualizerCell';
import { CENTER_WIDTH } from '../constants/layout';
import { Hand, HandStatusMap } from '../types';

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
  handStatusMap: HandStatusMap;
  handleStatusChange: (hand: Hand) => void;
  pseudoSelectionMap: { [key in Hand]?: boolean };
};

export const VisualizerGrid = ({
  hands,
  handStatusMap,
  handleStatusChange,
  pseudoSelectionMap,
}: Props) => (
  <Container>
    {hands.map((hand) => (
      <VisualizerCell
        hand={hand}
        status={handStatusMap[hand]}
        handleStatusChange={handleStatusChange}
        key={hand}
        pseudoStatus={pseudoSelectionMap[hand]}
      />
    ))}
  </Container>
);
