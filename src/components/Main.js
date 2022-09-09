import React, { useState, useEffect, useMemo } from 'react';
import { useStyletron } from 'baseui';

import { VisualizerGrid } from './VisualizerGrid';
import { VisualizerToolbar } from './VisualizerToolbar';
import { VisualizerInfobar } from './VisualizerInfobar';
import { Header } from './Header.tsx';
import { RangeSlider } from './RangeSlider.tsx';
import { STATUS } from '../constants/statuses';
import { LAYOUT_GRID_GUTTER, HANDS, DEFAULT_HAND_STATUS_MAP } from '../constants';
import { createHandStatusMap } from './utils';

/****** UTILS *****/
const setQueryStringWithoutPageReload = (queryString) => {
  const { protocol, host, pathname } = window.location;
  const newUrl = `${protocol}//${host}${pathname}?${queryString}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
};

const getQueryStringValue = (key, searchParams) => searchParams.getAll(key);

/***** COMPONENT *****/
export const Main = () => {
  const [css] = useStyletron();

  const searchParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  const yesHands = getQueryStringValue('yes', searchParams);
  const maybeHands = getQueryStringValue('maybe', searchParams);

  const [handStatusMap, setHandStatusMap] = useState({
    ...DEFAULT_HAND_STATUS_MAP,
    ...createHandStatusMap(yesHands, STATUS.yes),
    ...createHandStatusMap(maybeHands, STATUS.maybe),
  });

  const [pseudoSelectionMap, setPseudoSelectionMap] = useState({});

  useEffect(() => {
    searchParams.delete('yes');
    searchParams.delete('maybe');
    Object.entries(handStatusMap).forEach((hand) => {
      const [label, status] = hand;
      if (status === STATUS.yes) {
        searchParams.append('yes', label);
      } else if (status === STATUS.maybe) {
        searchParams.append('maybe', label);
      }
    });

    setQueryStringWithoutPageReload(searchParams.toString());
  }, [handStatusMap, searchParams]);

  /*** handlers ***/
  const handleStatusChange = (hand) => {
    const currStatus = handStatusMap[hand];
    const nextStatus =
      currStatus === STATUS.no
        ? STATUS.yes
        : currStatus === STATUS.maybe
        ? STATUS.no
        : STATUS.maybe;

    setHandStatusMap({
      ...handStatusMap,
      [hand]: nextStatus,
    });
  };
  const handleSetRange = (range) => {
    setHandStatusMap({
      ...handStatusMap,
      ...createHandStatusMap(range, STATUS.yes),
    });
  };
  const handlePseudoSelection = (selection) =>
    setPseudoSelectionMap({
      ...createHandStatusMap(selection, true),
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
            setHandStatusMap={setHandStatusMap}
            handStatusMap={handStatusMap}
            setPseudoSelection={handlePseudoSelection}
            resetPseudoSelection={handleResetPseudoSelection}
          />
          <VisualizerGrid
            hands={HANDS}
            handStatusMap={handStatusMap}
            handleStatusChange={handleStatusChange}
            pseudoSelectionMap={pseudoSelectionMap}
          />
          <VisualizerInfobar handStatusMap={handStatusMap} />
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
