import { useState } from "react";
import { Link } from "react-router-dom";

function TrainListPage({ trains }) {
  const [loading, setLoading] = useState(false);

  // Filter trains departing in the next 30 minutes
  const filteredTrains = trains.filter((train) => train.delayedBy >= 30);

  // Sort trains based on the specified criteria
  filteredTrains.sort((a, b) => {
    if (a.price.sleeper !== b.price.sleeper) {
      return a.price.sleeper - b.price.sleeper;
    } else if (a.seatsAvailable.sleeper !== b.seatsAvailable.sleeper) {
      return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
    } else {
      return (
        b.departureTime.Hours * 60 +
        b.departureTime.Minutes -
        a.departureTime.Hours * 60 -
        a.departureTime.Minutes
      );
    }
  });

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>All Trains</h2>
          <ul>
            {filteredTrains.map((train) => (
              <li key={train.trainNumber}>
                <Link to={`/train/${train.trainNumber}`}>
                  {train.trainName}
                </Link>
                <p>
                  Departure Time: {train.departureTime.Hours}:
                  {train.departureTime.Minutes}
                </p>
                <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
                <p>Seats Available (AC): {train.seatsAvailable.AC}</p>
                <p>Price (Sleeper): {train.price.sleeper}</p>
                <p>Price (AC): {train.price.AC}</p>
                <p>Delayed By: {train.delayedBy} minutes</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TrainListPage;
