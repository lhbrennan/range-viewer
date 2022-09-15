import React from 'react';
import { useStyletron } from 'baseui';
import { PAGE_TITLE } from '../constants';

const Header = () => {
  const [css, theme] = useStyletron();
  return (
    <section
      className={css({
        ...theme.typography.HeadingLarge,
        fontFamily: 'Bungee Inline, cursive',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.sizing.scale200,
        paddingBottom: theme.sizing.scale200,
        marginBottom: theme.sizing.scale700,
        backgroundColor: theme.colors.primary,
        color: theme.colors.mono100,
      })}
    >
      {PAGE_TITLE}
    </section>
  );
};

export { Header };
