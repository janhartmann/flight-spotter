import * as React from "react";
import injectSheet, { StyledComponentProps, StyleCreator } from "react-jss";
import classNames from "classnames";

import { ITheme } from "../../styles/theme";

export interface ICardHeaderProps extends StyledComponentProps {
  title?: string | React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const CardHeader: React.FC<ICardHeaderProps> = ({
  classes,
  title,
  action,
  className
}) => {
  return (
    <div
      className={classNames({
        [classes.root]: true,
        [className]: className
      })}
    >
      {title && <div className={classes.title}>{title}</div>}
      {action && <div className={classes.action}>{action}</div>}
    </div>
  );
};

const styles: StyleCreator = (theme: ITheme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    display: "flex",
    fontWeight: "bold",
    alignItems: "center"
  }
});

export default injectSheet(styles)(CardHeader);
