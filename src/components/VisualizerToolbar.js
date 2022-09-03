import React from 'react';
import { Button, KIND, SIZE } from 'baseui/button';
import { useStyletron } from 'baseui';
import { BUTTON_WIDTH, TOOLBAR_RIGHT_MARGIN } from '../constants/layout';

const RangeButton = ({ children, ...rest }) => {
  const [, theme] = useStyletron();
  return (
    <Button
      kind={KIND.primary}
      size={SIZE.compact}
      overrides={{ Root: { style: { marginBottom: theme.sizing.scale300, width: BUTTON_WIDTH } } }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const VisualizerToolbar = ({
  selectAllPairs,
  selectAllBroadway,
  selectAllSuitedConnectors,
  selectAllSuitedAx,
  selectAllHands,
  resetAllHands,
}) => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        marginRight: TOOLBAR_RIGHT_MARGIN,
      })}
    >
      <RangeButton onClick={resetAllHands} size={SIZE.large}>
        Reset
      </RangeButton>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
        })}
      >
        <RangeButton onClick={selectAllPairs}>All Pairs</RangeButton>
        <RangeButton onClick={selectAllBroadway}>All Broadway</RangeButton>
        <RangeButton onClick={selectAllSuitedConnectors}>All Suited Connectors</RangeButton>
        <RangeButton onClick={selectAllSuitedAx}>All Suited AX</RangeButton>
        <RangeButton onClick={selectAllHands}>All Hands</RangeButton>
      </div>
    </div>
  );
};
