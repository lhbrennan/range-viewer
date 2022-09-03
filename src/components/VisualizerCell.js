import React from 'react';
import { LightTheme } from 'baseui';
import { styled } from 'styletron-react';

import { determineHandType, HAND_TYPES } from '../utils';

const Wrapper = styled('div', ({ $handType, $status }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  border:
    $handType === HAND_TYPES.PAIR
      ? `2px solid ${LightTheme.colors.mono700}`
      : $handType === HAND_TYPES.SUITED
      ? `1px solid ${LightTheme.colors.accent300}`
      : `1px solid ${LightTheme.colors.mono100}`,
  padding: '2px',
  borderRadius: '8px',
  backgroundColor:
    $status === 'YES'
      ? LightTheme.colors.accent
      : $status === 'NO'
      ? LightTheme.colors.mono400
      : LightTheme.colors.accent200,
}));

export const VisualizerCell = ({ label, status, handleStatusChange }) => {
  const handType = determineHandType(label);

  return (
    <Wrapper
      $handType={handType}
      $status={status}
      onClick={() => handleStatusChange(label)}
    >
      {label}
    </Wrapper>
  );
};
