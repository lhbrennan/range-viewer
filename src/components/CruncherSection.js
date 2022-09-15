import React, { useState } from 'react';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';

import { CENTER_WIDTH } from '../constants';

const CruncherSection = (props) => {
  const [villianRange, setVillianRange] = useState('JTs, AQo, TT');
  const [heroHand, setHeroHand] = useState(['As', 'Ad']);
  const [board, setBoard] = useState(['5c', '6h', '7h']);

  const handleCrunchEquity = async () => {
    try {
      const response = await fetch('/.netlify/functions/calculate-equity', {
        method: 'POST',
        body: JSON.stringify({
          heroHand,
          villianRange,
          board,
          numTrials: 1000,
        }),
      });

      console.log(response.body);
    } catch (e) {
      //error
    }
  };

  const [css] = useStyletron();

  return (
    <section className={css({ maxWidth: CENTER_WIDTH, margin: '0 auto' })}>
      <div className={css({ display: 'flex' })}>
      <div>
        <div>{"Villian's Range"}</div>
        <Input value={villianRange} onChange={(e) => setVillianRange(e.target.value)} />
      </div>

      <div>
        <div>{"Hero's Hand"}</div>
        <Input value={heroHand} onChange={(e) => setHeroHand(e.target.value)} />
      </div>

      <div>
        <div>{'Board'}</div>
        <Input value={board} onChange={(e) => setBoard(e.target.value)} />
      </div>
</div>
      <Button onClick={handleCrunchEquity}>Crunch Equity</Button>
    </section>
  );
};

export { CruncherSection };
