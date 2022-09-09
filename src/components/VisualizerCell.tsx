import React from 'react';
import { styled } from 'baseui';
import { colors } from 'baseui/tokens';
import { determineHandType } from '../utils';
import { STATUS, HAND_TYPE } from '../constants';
import type { HandType, Status } from '../types';

type Args = {
  $handType: HandType;
  $status: Status;
  $pseudoStatus: boolean;
};
const Button = styled<'button', Args>('button', ({ $theme, $handType, $status, $pseudoStatus }) => {
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
        : $handType === HAND_TYPE.PAIR
        ? BACKGROUND_COLOR.pair
        : $handType === HAND_TYPE.SUITED
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

type Props = {
  label: string;
  status: Status;
  handleStatusChange: (label: string) => void;
  pseudoStatus: boolean;
};
export const VisualizerCell = ({ label, status, handleStatusChange, pseudoStatus }: Props) => {
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
