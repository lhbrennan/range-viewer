import React, { useState } from 'react';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';

import { CENTER_WIDTH } from '../constants';

const CruncherSection = ({ range }) => {
  // const [villianRange, setVillianRange] = useState(range);
  const [heroHand, setHeroHand] = useState(['Th,Td']);
  const [board, setBoard] = useState(['5c,6h,7h']);
  const [numTrials, setNumTrials] = useState(250);

  const handleCrunchEquity = async () => {
    try {
      const response = await fetch('/.netlify/functions/calculate-equity', {
        method: 'POST',
        body: JSON.stringify({
          heroHand: heroHand[0].split(',').map(card => card.trim()),
          villianRange: range,
          board: board[0].split(',').map(card => card.trim()),
          numTrials,
        }),
      });

      console.log(response.body);
    } catch (e) {
      console.error(e);
    }
  };

  const [css] = useStyletron();

  return (
    <section className={css({ maxWidth: CENTER_WIDTH, margin: '0 auto' })}>
      <div className={css({ display: 'flex' })}>
        {/* <div>
          <div>{"Villian's Range"}</div>
          <Input value={villianRange} onChange={(e) => setVillianRange(e.target.value)} />
        </div> */}

        <div>
          <div>{"Hero's Hand"}</div>
          <Input value={heroHand} onChange={(e) => setHeroHand(e.target.value)} />
        </div>

        <div>
          <div>{'Board'}</div>
          <Input value={board} onChange={(e) => setBoard(e.target.value)} />
        </div>

        <div>
          <div>{'Number of Trials'}</div>
          <Input value={numTrials} onChange={(e) => setNumTrials(e.target.value)} />
        </div>
      </div>
      <Button onClick={handleCrunchEquity}>Crunch Equity</Button>
    </section>
  );
};

export { CruncherSection };
