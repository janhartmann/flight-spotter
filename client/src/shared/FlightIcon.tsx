import * as React from "react";
import classNames from "classnames";

export interface IFlightIconProps {
  color?: string;
  size: number;
  className?: string;

  direction?: number;
}

const FlightIcon: React.FunctionComponent<IFlightIconProps> = ({
  className,
  color,
  size,
  direction
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 19"
      height={size}
      width={size}
      className={classNames({
        [className]: className
      })}
      style={{ transform: `rotate(${direction || 0}deg)` }}
    >
      <path
        fill={color || "#fff"}
        transform="translate(2 2)"
        d="M15,6.8182L15,8.5l-6.5-1
l-0.3182,4.7727L11,14v1l-3.5-0.6818L4,15v-1l2.8182-1.7273L6.5,7.5L0,8.5V6.8182L6.5,4.5v-3c0,0,0-1.5,1-1.5s1,1.5,1,1.5v2.8182
L15,6.8182z"
      />
    </svg>
  );
};

export default FlightIcon;
