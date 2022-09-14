import React, { useState, useEffect, useMemo } from 'react';
import { useStyletron } from 'baseui';

import { VisualizerGrid } from './VisualizerGrid';
import { VisualizerToolbar } from './VisualizerToolbar';
import { VisualizerInfobar } from './VisualizerInfobar';
import { Header } from './Header';
import { RangeSlider } from './RangeSlider';
import { STATUS } from '../constants/statuses';
import { LAYOUT_GRID_GUTTER, HANDS, DEFAULT_HAND_STATUS_MAP } from '../constants';
import { createHandSelectionMap, createPsuedoSelectionMap } from './utils';
import { isHand } from '../utils';
import type { Status, Hand, HandSelectionMap } from '../types';

/****** UTILS *****/
const setQueryStringWithoutPageReload = (queryString: string) => {
  const { protocol, host, pathname } = window.location;
  const newUrl = `${protocol}//${host}${pathname}?${queryString}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
};

const getQueryStringValue = (status: Status, searchParams: URLSearchParams) =>
  searchParams.getAll(status);

/***** COMPONENT *****/
export const Main = () => {
  const [css] = useStyletron();

  const searchParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  // @ts-ignore
  const yesHands: Hand[] = getQueryStringValue('yes', searchParams).filter((maybeHand) =>
    isHand(maybeHand)
  );
  // @ts-ignore
  const maybeHands: Hand[] = getQueryStringValue('maybe', searchParams).filter((maybeHand) =>
    isHand(maybeHand)
  );

  const [handSelectionMap, setHandSelectionMap] = useState<HandSelectionMap>({
    ...DEFAULT_HAND_STATUS_MAP,
    ...createHandSelectionMap(yesHands, STATUS.yes),
    ...createHandSelectionMap(maybeHands, STATUS.maybe),
  });

  const [pseudoSelectionMap, setPseudoSelectionMap] = useState({});

  // const [useMaybes, setUseMaybes] = useState(false);

  useEffect(() => {
    searchParams.delete('yes');
    searchParams.delete('maybe');
    Object.entries(handSelectionMap).forEach((hand) => {
      const [label, status] = hand;
      if (status === STATUS.yes) {
        searchParams.append('yes', label);
      } else if (status === STATUS.maybe) {
        searchParams.append('maybe', label);
      }
    });

    setQueryStringWithoutPageReload(searchParams.toString());
  }, [handSelectionMap, searchParams]);

  /*** handlers ***/
  const handleSelectionChange = (hand: Hand) => {
    const currStatus = handSelectionMap[hand];
    const nextStatus = currStatus === STATUS.no ? STATUS.yes : STATUS.no;

    // const nextStatus =
    //   currStatus === STATUS.no
    //     ? STATUS.yes
    //     : currStatus === STATUS.maybe
    //     ? STATUS.no
    //     : STATUS.maybe;

    setHandSelectionMap({
      ...handSelectionMap,
      [hand]: nextStatus,
    });
  };
  const handleSetRange = (hands: Hand[]) => {
    setHandSelectionMap({
      ...handSelectionMap,
      ...createHandSelectionMap(hands, STATUS.yes),
    });
  };
  const handlePseudoSelection = (hands: Hand[]) =>
    setPseudoSelectionMap({
      ...createPsuedoSelectionMap(hands, true),
    });
  const handleResetPseudoSelection = () => {
    setPseudoSelectionMap({});
  };

  return (
    <main style={{ height: '100%' }}>
      <Header />
      <div>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'start',
            justifyItems: 'end',
            columnGap: LAYOUT_GRID_GUTTER,
          })}
        >
          <VisualizerToolbar
            setHandSelectionMap={setHandSelectionMap}
            handSelectionMap={handSelectionMap}
            setPseudoSelection={handlePseudoSelection}
            resetPseudoSelection={handleResetPseudoSelection}
          />
          <VisualizerGrid
            hands={[...HANDS]}
            handSelectionMap={handSelectionMap}
            handleSelectionChange={handleSelectionChange}
            pseudoSelectionMap={pseudoSelectionMap}
          />
          <VisualizerInfobar handSelectionMap={handSelectionMap} />
        </div>
        <RangeSlider
          setRange={handleSetRange}
          setPseudoSelection={handlePseudoSelection}
          resetPseudoSelection={handleResetPseudoSelection}
        />
      </div>
    </main>
  );
};
