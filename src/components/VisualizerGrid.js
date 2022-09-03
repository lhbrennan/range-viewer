import React from 'react';
import { styled } from 'baseui';

import { VisualizerCell } from './VisualizerCell';
import { CENTER_WIDTH } from '../constants/layout';

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

export const VisualizerGrid = ({
  hands,
  handStatusMap,
  handleStatusChange,
  pseudoSelectionMap,
}) => (
  <Container>
    {hands.map((hand) => (
      <VisualizerCell
        label={hand}
        status={handStatusMap[hand]}
        handleStatusChange={handleStatusChange}
        key={hand}
        pseudoStatus={pseudoSelectionMap[hand]}
      />
    ))}
  </Container>
);
