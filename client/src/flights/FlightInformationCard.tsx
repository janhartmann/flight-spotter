import * as React from "react";
import Card from "../shared/card/Card";

export interface IFlightInformationCardProps {
  className?: string;
}

const FlightInformationCard: React.FunctionComponent<
  IFlightInformationCardProps
> = ({ className }) => {
  return (
    <Card title="Flight SAS1933" className={className}>
      <p>Test</p>
    </Card>
  );
};

export default FlightInformationCard;
