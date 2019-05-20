import * as React from "react";
import injectSheet, { StyledComponentProps, StyleCreator } from "react-jss";
import classNames from "classnames";

import { ITheme } from "../../styles/theme";
import CardHeader from "./CardHeader";

export interface ICardProps extends StyledComponentProps {
  title?: string | React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const Card: React.FC<ICardProps> = ({
  classes,
  title,
  children,
  className,
  action
}) => {
  return (
    <div
      className={classNames({
        [classes.root]: true,
        [className]: className
      })}
    >
      {(title || action) && <CardHeader title={title} action={action} />}
      {children}
    </div>
  );
};

const styles: StyleCreator = (theme: ITheme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.dark[2],
    borderRadius: theme.layout.borderRadius,
    border: `1px solid ${theme.colors.dark[5]}`,
    padding: theme.layout.gutter,
    boxShadow: theme.layout.boxShadow,
    position: "relative"
  }
});

export default injectSheet(styles)(Card);
