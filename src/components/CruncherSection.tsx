import React, { useState } from 'react';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { StatefulTooltip } from 'baseui/tooltip';
import { useStyletron } from 'baseui';

import { roundToPrecision } from '../utils';
import { ReactComponent as Info } from './info-icon.svg';
import type { Hand } from '../types';

const Tooltip = () => {
  const [css, theme] = useStyletron();
  return (
    <StatefulTooltip
      content={() => (
        <div className={css({ padding: theme.sizing.scale200 })}>
          This is the number of random boards to generate for each hand combination in the villian's
          range
        </div>
      )}
    >
      <Info title="tooltip" width="12" height="12" />
    </StatefulTooltip>
  );
};

type Props = {
  range: Hand[];
};
const CruncherSection = ({ range }: Props) => {
  const [heroHand, setHeroHand] = useState('Th,Td');
  const [board, setBoard] = useState('5c,6h,7h');
  const [numTrials, setNumTrials] = useState(300);
  const [equity, setEquity] = useState<number | null>(null);

  const handleCrunchEquity = async () => {
    try {
      const response = await fetch('/.netlify/functions/calculate-equity', {
        method: 'POST',
        body: JSON.stringify({
          heroHand: heroHand.split(',').map((card) => card.trim()),
          villianRange: range,
          board: board.split(',').map((card) => card.trim()),
          numTrials,
        }),
      });

      const { equity } = await response.json();
      if (response.ok) {
        console.log('equity', equity);
        if (typeof equity === 'number') {
          setEquity(equity);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [css, theme] = useStyletron();

  return (
    <div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          columnGap: theme.sizing.scale1000,
          rowGap: theme.sizing.scale700,
        })}
      >
        <div className={css({ gridColumnStart: 1, gridColumnEnd: 3 })}>
          <div>Board</div>
          <Input value={board} onChange={(e) => setBoard(e.target.value)} />
        </div>

        <div>
          <div>Hero's Equity</div>
          {equity && (
            <div>
              <span>{roundToPrecision(equity * 100, 0.01)}%</span>
            </div>
          )}
        </div>

        <div>
          <div>Hero's Hand</div>
          <Input value={heroHand} onChange={(e) => setHeroHand(e.target.value)} />
        </div>

        <div>
          <div>
            <span className={css({ marginRight: theme.sizing.scale200 })}>Number of Trials</span>
            <Tooltip />
          </div>
          <Input value={numTrials} onChange={(e) => setNumTrials(Number(e.target.value))} />
        </div>

        <Button
          overrides={{ BaseButton: { style: { alignSelf: 'end', maxHeight: '44px' } } }}
          onClick={handleCrunchEquity}
        >
          Crunch Equity
        </Button>
      </div>
    </div>
  );
};

export { CruncherSection };
