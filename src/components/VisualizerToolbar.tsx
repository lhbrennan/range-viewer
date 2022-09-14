import React from 'react';
import { Button, type ButtonProps, KIND, SIZE } from 'baseui/button';
import { useStyletron } from 'baseui';

import { BUTTON_WIDTH } from '../constants/layout';
import {
  HANDS,
  PAIRS,
  BROADWAY,
  SUITED_CONNECTORS,
  DEFAULT_HAND_STATUS_MAP,
} from '../constants/hands';
import { STATUS } from '../constants/statuses';
import { createHandSelectionMap } from './utils';
import type { HandSelectionMap, Hand } from '../types';

type RangeButtonProps = ButtonProps & {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
const RangeButton = ({ children, ...rest }: RangeButtonProps) => {
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

type Props = {
  setHandSelectionMap: (handSelectionMap: HandSelectionMap) => void;
  handSelectionMap: HandSelectionMap;
  setPseudoSelection: (hands: Hand[]) => void;
  resetPseudoSelection: () => void;
};
export const VisualizerToolbar = ({
  setHandSelectionMap,
  handSelectionMap,
  setPseudoSelection,
  resetPseudoSelection,
}: Props) => {
  const [css] = useStyletron();

  const selectAllPairs = () => {
    setHandSelectionMap({
      ...handSelectionMap,
      ...createHandSelectionMap([...PAIRS], STATUS.yes),
    });
  };
  const selectAllBroadway = () => {
    setHandSelectionMap({
      ...handSelectionMap,
      ...createHandSelectionMap([...BROADWAY], STATUS.yes),
    });
  };
  const selectAllSuitedConnectors = () => {
    setHandSelectionMap({
      ...handSelectionMap,
      ...createHandSelectionMap([...SUITED_CONNECTORS], STATUS.yes),
    });
  };
  const selectAllSuitedAx = () => {
    setHandSelectionMap({
      ...handSelectionMap,
      ...createHandSelectionMap(HANDS.slice(0, 13), STATUS.yes),
    });
  };
  const selectAllHands = () => {
    setHandSelectionMap(createHandSelectionMap([...HANDS], STATUS.yes));
  };
  const resetAllHands = () => {
    setHandSelectionMap(DEFAULT_HAND_STATUS_MAP);
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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
        <RangeButton
          onClick={selectAllPairs}
          onMouseEnter={() => setPseudoSelection([...PAIRS])}
          onMouseLeave={resetPseudoSelection}
        >
          All Pairs
        </RangeButton>
        <RangeButton
          onClick={selectAllBroadway}
          onMouseEnter={() => setPseudoSelection([...BROADWAY])}
          onMouseLeave={resetPseudoSelection}
        >
          All Broadway
        </RangeButton>
        <RangeButton
          onClick={selectAllSuitedConnectors}
          onMouseEnter={() => setPseudoSelection([...SUITED_CONNECTORS])}
          onMouseLeave={resetPseudoSelection}
        >
          All Suited Connectors
        </RangeButton>
        <RangeButton
          onClick={selectAllSuitedAx}
          onMouseEnter={() => setPseudoSelection(HANDS.slice(0, 13))}
          onMouseLeave={resetPseudoSelection}
        >
          All Suited AX
        </RangeButton>
        <RangeButton
          onClick={selectAllHands}
          onMouseEnter={() => setPseudoSelection([...HANDS])}
          onMouseLeave={resetPseudoSelection}
        >
          All Hands
        </RangeButton>
      </div>
    </div>
  );
};
