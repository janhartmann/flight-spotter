import * as React from "react";
import classNames from "classnames";
import injectSheet, { StyledComponentProps, StyleCreator } from "react-jss";
import { Size } from "./constants";
import { ITheme } from "../styles/theme";

export interface ISpinnerProps extends StyledComponentProps {
  className?: string;
  size?: Size;
}

const Spinner: React.FC<ISpinnerProps> = ({
  classes,
  size = Size.MEDIUM,
  className
}) => {
  return (
    <div
      className={classNames({
        [classes.root]: true,
        [classes[size]]: size,
        [className]: className
      })}
    />
  );
};

const styles: StyleCreator = (theme: ITheme) => ({
  "@keyframes clip": {
    "0%": {
      transform: "rotate(0deg) scale(1)"
    },
    "50%": {
      transform: "rotate(180deg) scale(0.8)"
    },
    "100%": {
      transform: "rotate(360deg) scale(1)"
    }
  },
  root: {
    background: "transparent",
    borderRadius: "100%",
    border: "2px solid",
    borderBottomColor: "transparent !important",
    display: "inline-block",
    animation: "clip 0.75s 0s infinite linear",
    animationFillMode: "both",
    cursor: "wait",
    width: 50,
    height: 50,
    color: theme.colors.dark[1]
  },
  [Size.SMALL]: {
    width: 20,
    height: 20
  },
  [Size.MEDIUM]: {
    width: 40,
    height: 40
  },
  [Size.LARGE]: {
    width: 60,
    height: 60
  }
});

export default injectSheet(styles)(Spinner);
