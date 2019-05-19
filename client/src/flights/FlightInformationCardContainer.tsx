import * as React from "react";

import { GetFlightInformation } from "../data/generated-types";
import FlightInformationCard from "./FlightInformationCard";

export interface IFlightInformationCardContainerProps {
  id: string;
}

const FlightInformationCardContainer: React.FC<
  IFlightInformationCardContainerProps
> = ({ id }) => {
  return (
    <GetFlightInformation.Component
      variables={{ input: { id } }}
      pollInterval={5000}
    >
      {({ data, loading }) => {
        return (
          <FlightInformationCard
            flight={data && data.flight}
            loading={loading}
          />
        );
      }}
    </GetFlightInformation.Component>
  );
};

export default FlightInformationCardContainer;
