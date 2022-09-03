import React from 'react';
import { styled } from 'baseui';
import { colors } from 'baseui/tokens';

import { determineHandType, HAND_TYPES } from '../utils';

const Button = styled('button', ({ $theme, $handType, $status }) => {
  const BACKGROUND_COLOR = {
    yes: $theme.colors.accent,
    maybe: $theme.colors.accent200,
    suited: colors.purple100,
    pair: colors.green50,
    unsuited: colors.red50,
  };

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '2px',
    borderRadius: '8px',

    color:
      $status === 'YES' || $status === 'MAYBE'
        ? $theme.colors.contentInversePrimary
        : $theme.colors.contentPrimary,
    backgroundColor:
      $status === 'YES'
        ? BACKGROUND_COLOR.yes
        : $status === 'MAYBE'
        ? BACKGROUND_COLOR.maybe
        : $handType === HAND_TYPES.PAIR
        ? BACKGROUND_COLOR.pair
        : $handType === HAND_TYPES.SUITED
        ? BACKGROUND_COLOR.suited
        : BACKGROUND_COLOR.unsuited,
    border:
      $status === 'YES'
        ? `1px solid ${BACKGROUND_COLOR.yes}`
        : $status === 'MAYBE'
        ? `1px solid ${BACKGROUND_COLOR.maybe}`
        : `1px solid ${$theme.colors.borderOpaque}`,
  };
});

export const VisualizerCell = ({ label, status, handleStatusChange }) => {
  const handType = determineHandType(label);

  return (
    <Button $handType={handType} $status={status} onClick={() => handleStatusChange(label)}>
      {label}
    </Button>
  );
};
