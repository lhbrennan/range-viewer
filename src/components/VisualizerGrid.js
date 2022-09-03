import React from 'react';
import { styled } from 'baseui';

import { VisualizerCell } from './VisualizerCell';

const Outer = styled('div', {
  maxWidth: '650px',
  margin: '0px auto',
  height: '500px',
  width: '500px',
});

const Middle = styled('div', {
  paddingTop: '100%',
  // overflow: 'hidden',
  position: 'relative',
});

const Inner = styled('div', {
  maxHeight: '700px',
  maxWidth: '700px',
  display: 'grid',
  gridTemplateColumns: 'repeat(13, minmax(30px, 1fr))',
  gridTemplateRows: 'repeat(13, minmax(30px, 1fr))',

  fontFamily: 'PT Sans, sans-serif',

  gridColumnGap: '4px',
  gridRowGap: '4px',

  borderRadius: '8px',

  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

export const VisualizerGrid = ({ hands, handStatusMap, handleStatusChange }) => (
  <Outer>
    <Middle>
      <Inner>
        {hands.map((hand) => (
          <VisualizerCell
            label={hand}
            status={handStatusMap[hand]}
            handleStatusChange={handleStatusChange}
            key={hand}
          />
        ))}
      </Inner>
    </Middle>
  </Outer>
);
