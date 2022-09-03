import React from 'react';
import { Button, KIND, SIZE } from 'baseui/button';
import { styled } from 'styletron-react';

const Section = styled('section', {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  maxWidth: '700px',
  margin: '0px auto 20px auto',
});

export const VisualizerToolbar = ({
  selectAllPairs,
  selectAllBroadway,
  selectAllSuitedConnectors,
  selectAllSuitedAx,
  selectAllHands,
  resetAllHands,
}) => (
  <Section>
    <Button onClick={selectAllPairs} kind={KIND.primary} size={SIZE.compact}>
      All Pairs
    </Button>
    <Button onClick={selectAllBroadway} kind={KIND.primary} size={SIZE.compact}>
      All Broadway
    </Button>
    <Button
      onClick={selectAllSuitedConnectors}
      kind={KIND.primary}
      size={SIZE.compact}
    >
      All Suited Connectors
    </Button>
    <Button onClick={selectAllSuitedAx} kind={KIND.primary} size={SIZE.compact}>
      All Suited AX
    </Button>
    <Button onClick={selectAllHands} kind={KIND.primary} size={SIZE.compact}>
      All Hands
    </Button>
    <Button onClick={resetAllHands} kind={KIND.primary} size={SIZE.compact}>
      Reset
    </Button>
  </Section>
);
