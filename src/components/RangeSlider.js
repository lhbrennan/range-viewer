import React from 'react';
import { Slider } from 'baseui/slider';
import { Button, SIZE, KIND } from 'baseui/button';
import { styled } from 'baseui';

import { calcNumHandCombos, totalPossibleCombos } from '../utils';
import { sixMaxRankings } from '../constants/startingHandRankings';
import { BUTTON_WIDTH, CENTER_WIDTH, TOOLBAR_RIGHT_MARGIN } from '../constants/layout';

const calcSliderRange = (start, end, handRankings) => {
  let numCombos = 0;
  let startIdx = 0;
  let endIdx = null;
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

const RangeSlider = ({ setRange }) => {
  const [value, setValue] = React.useState([0, 25]);
  return (
    <Container>
      <Button
        size={SIZE.compact}
        kind={KIND.minimal}
        onClick={() => setRange(calcSliderRange(...value, sixMaxRankings))}
        overrides={{ Root: { style: { width: BUTTON_WIDTH, marginRight: TOOLBAR_RIGHT_MARGIN } } }}
      >
        Add Selected Range
      </Button>
      <Slider
        value={value}
        onChange={({ value }) => value && setValue(value)}
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
        }}
      />
    </Container>
  );
};

export { RangeSlider };
