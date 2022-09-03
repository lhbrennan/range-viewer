import React from 'react';
import { styled } from 'baseui';
import { colors } from 'baseui/tokens';

import { determineHandType, HAND_TYPES } from '../utils';
import { STATUS } from '../constants/statuses';

const Button = styled('button', ({ $theme, $handType, $status, $pseudoStatus }) => {
  const BACKGROUND_COLOR = {
    yes: $theme.colors.accent,
    maybe: $theme.colors.accent200,
    suited: colors.purple100,
    pair: colors.green50,
    unsuited: colors.red50,
  };

  return {
    ...$theme.typography.LabelSmall,
    fontFamily: 'inherit',
    cursor: 'pointer',
    padding: '2px',
    borderRadius: '8px',
    ':hover': {
      border: `2px solid ${$theme.colors.black}`,
    },
    color:
      $status === STATUS.yes || $status === STATUS.maybe
        ? $theme.colors.contentInversePrimary
        : $theme.colors.contentPrimary,
    backgroundColor:
      $status === STATUS.yes
        ? BACKGROUND_COLOR.yes
        : $status === STATUS.maybe
        ? BACKGROUND_COLOR.maybe
        : $handType === HAND_TYPES.PAIR
        ? BACKGROUND_COLOR.pair
        : $handType === HAND_TYPES.SUITED
        ? BACKGROUND_COLOR.suited
        : BACKGROUND_COLOR.unsuited,
    border: $pseudoStatus
      ? `2px solid ${$theme.colors.black}`
      : $status === STATUS.yes
      ? `1px solid ${BACKGROUND_COLOR.yes}`
      : $status === STATUS.maybe
      ? `1px solid ${BACKGROUND_COLOR.maybe}`
      : `1px solid ${$theme.colors.borderOpaque}`,
  };
});

export const VisualizerCell = ({ label, status, handleStatusChange, pseudoStatus }) => {
  const handType = determineHandType(label);

  return (
    <Button
      $handType={handType}
      $status={status}
      $pseudoStatus={pseudoStatus}
      onClick={() => handleStatusChange(label)}
    >
      {label}
    </Button>
  );
};
