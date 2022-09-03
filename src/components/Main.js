import React, { useState, useEffect } from 'react';

import { HANDS, PAIRS, BROADWAY, SUITED_CONNECTORS, DEFAULT_HAND_STATUS_MAP } from '../constants/hands';
import { VisualizerGrid } from './VisualizerGrid';
import { VisualizerToolbar } from './VisualizerToolbar';
import { VisualizerInfobar } from './VisualizerInfobar';
import { Header } from './Header';
import { RangeSlider } from './RangeSlider';
// import { CruncherSection } from "./CruncherSection";
import { useStyletron } from 'baseui';
import { LAYOUT_GRID_GUTTER } from '../constants/layout';
import { STATUS } from '../constants/statuses';

/****** UTILS *****/
const setQueryStringWithoutPageReload = (queryString) => {
  const { protocol, host, pathname } = window.location;
  const newUrl = `${protocol}//${host}${pathname}?${queryString}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
};

const getQueryStringValue = (key, searchParams) => searchParams.getAll(key);

const createHandStatusMap = (hands, status) => {
  if (!hands) {
    return {};
  }
  return hands.reduce((obj, pair) => {
    obj[pair] = status;
    return obj;
  }, {});
};

/***** COMPONENT *****/
export const Main = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const yesHands = getQueryStringValue('yes', searchParams);
  const maybeHands = getQueryStringValue('maybe', searchParams);

  const [handStatusMap, setHandStatusMap] = useState({
    ...DEFAULT_HAND_STATUS_MAP,
    ...createHandStatusMap(yesHands, STATUS.yes),
    ...createHandStatusMap(maybeHands, STATUS.maybe),
  });

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

  const handleSelectAllPairs = () => {
    setHandStatusMap({
      ...handStatusMap,
      ...createHandStatusMap(PAIRS, STATUS.yes),
    });
  };

  const handleSelectAllBroadway = () => {
    setHandStatusMap({
      ...handStatusMap,
      ...createHandStatusMap(BROADWAY, STATUS.yes),
    });
  };

  const handleSelectAllSuitedConnectors = () => {
    setHandStatusMap({
      ...handStatusMap,
      ...createHandStatusMap(SUITED_CONNECTORS, STATUS.yes),
    });
  };

  const handleSelectAllSuitedAx = () => {
    setHandStatusMap({
      ...handStatusMap,
      ...createHandStatusMap(HANDS.slice(0, 13), STATUS.yes),
    });
  };

  const handleSelectAllHands = () => {
    setHandStatusMap(createHandStatusMap(HANDS, STATUS.yes));
  };

  const handleResetAllHands = () => {
    setHandStatusMap(DEFAULT_HAND_STATUS_MAP);
  };

  const handleSetRange = (range) => {
    setHandStatusMap({
      ...handStatusMap,
      ...createHandStatusMap(range, STATUS.yes),
    });
  };

  const [css] = useStyletron();

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
            selectAllPairs={handleSelectAllPairs}
            selectAllBroadway={handleSelectAllBroadway}
            selectAllSuitedConnectors={handleSelectAllSuitedConnectors}
            selectAllSuitedAx={handleSelectAllSuitedAx}
            selectAllHands={handleSelectAllHands}
            resetAllHands={handleResetAllHands}
          />
          <VisualizerGrid
            hands={HANDS}
            handStatusMap={handStatusMap}
            handleStatusChange={handleStatusChange}
          />
          <VisualizerInfobar handStatusMap={handStatusMap} />
        </div>
        <RangeSlider setRange={handleSetRange} />
      </div>
      {/* <CruncherSection /> */}
    </main>
  );
};
