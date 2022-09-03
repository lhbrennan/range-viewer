import React from "react";
import { Button, KIND, SIZE } from "baseui/button";
import { useStyletron } from "baseui";

const RangeButton = ({ children, ...rest }) => {
  const [, theme] = useStyletron();
  return (
    <Button
      kind={KIND.primary}
      size={SIZE.compact}
      overrides={{ Root: { style: { marginBottom: theme.sizing.scale300 } } }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const VisualizerToolbar = ({
  selectAllPairs,
  selectAllBroadway,
  selectAllSuitedConnectors,
  selectAllSuitedAx,
  selectAllHands,
  resetAllHands,
}) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: "300px",
        marginRight: theme.sizing.scale900,
      })}
    >
      <RangeButton onClick={resetAllHands} size={SIZE.large}>
        Reset
      </RangeButton>

      <RangeButton onClick={selectAllPairs}>All Pairs</RangeButton>
      <RangeButton onClick={selectAllBroadway}>All Broadway</RangeButton>
      <RangeButton onClick={selectAllSuitedConnectors}>
        All Suited Connectors
      </RangeButton>
      <RangeButton onClick={selectAllSuitedAx}>All Suited AX</RangeButton>
      <RangeButton onClick={selectAllHands}>All Hands</RangeButton>
    </div>
  );
};
