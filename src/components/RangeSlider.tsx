import React from 'react';
import { Slider } from 'baseui/slider';
import { Button, SIZE } from 'baseui/button';
import { styled } from 'baseui';

import { calcNumHandCombos, totalPossibleCombos } from '../utils';
import { createPseudoSelectionMap } from './utils';
import { BUTTON_WIDTH, CENTER_WIDTH, LAYOUT_GRID_GUTTER, SIX_MAX_HAND_RANKING } from '../constants';
import type { Hand, PseudoSelectionMap } from '../types';

type Args = {
  start: number;
  end: number;
  handRankings: Hand[];
};
const getSelectRange = ({ start, end, handRankings }: Args) => {
  let numCombos = 0;
  let startIdx = 0;
  let endIdx = 0;
  for (let i = 0; i < handRankings.length; i++) {
    const hand = handRankings[i];
    numCombos += calcNumHandCombos(hand);
    if ((numCombos / totalPossibleCombos) * 100 > start) {
      startIdx = i;
      break;
    }
  }
  for (let i = startIdx; i < handRankings.length; i++) {
    const hand = handRankings[i];
    numCombos += calcNumHandCombos(hand);
    if ((numCombos / totalPossibleCombos) * 100 > end) {
      endIdx = i;
      break;
    }
  }
  return handRankings.slice(startIdx, endIdx + 1);
};

const Container = styled('div', ({ $theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'start',
  justifyItems: 'end',
  marginTop: $theme.sizing.scale500,
}));

type Props = {
  handleHandSelection: (hands: Hand[]) => void;
  setPseudoSelectionMap: (m: PseudoSelectionMap) => void;
};
const RangeSlider = ({ handleHandSelection, setPseudoSelectionMap }: Props) => {
  const [value, setValue] = React.useState([0, 25]);
  const selectedRange = getSelectRange({
    start: value[0],
    end: value[1],
    handRankings: [...SIX_MAX_HAND_RANKING],
  });

  const setPseudoSelection = () =>
    setPseudoSelectionMap({
      ...createPseudoSelectionMap(selectedRange, true),
    });

  const resetPseudoSelection = () => {
    setPseudoSelectionMap({});
  };

  return (
    <Container>
      <Button
        size={SIZE.compact}
        onClick={() => handleHandSelection(selectedRange)}
        overrides={{ Root: { style: { width: BUTTON_WIDTH, marginRight: LAYOUT_GRID_GUTTER } } }}
        onMouseEnter={setPseudoSelection}
        onMouseLeave={resetPseudoSelection}
      >
        Add Selected Range
      </Button>
      <Slider
        value={value}
        onChange={({ value }) => {
          if (value) {
            setValue(value);
            setPseudoSelection();
          }
        }}
        step={0.5}
        overrides={{
          Root: { style: { width: CENTER_WIDTH } },
          ThumbValue: {
            style: {
              ':after': {
                content: '"%"',
              },
            },
          },
          Track: {
            props: {
              onMouseEnter: setPseudoSelection,
              onMouseLeave: resetPseudoSelection,
            },
          },
        }}
      />
    </Container>
  );
};

export { RangeSlider };
