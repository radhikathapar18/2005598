import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://20.244.56.144:80/train";

function SingleTrainPage() {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/trains/${trainNumber}`)
      .then((response) => {
        setTrain(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [trainNumber]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Train Details</h2>
          <p>Train Name: {train.trainName}</p>
          <p>Train Number: {train.trainNumber}</p>
          <p>
            Departure Time: {train.departureTime.Hours}:
            {train.departureTime.Minutes}
          </p>
          <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
          <p>Seats Available (AC): {train.seatsAvailable.AC}</p>
          <p>Price (Sleeper): {train.price.sleeper}</p>
          <p>Price (AC): {train.price.AC}</p>
          <p>Delayed By: {train.delayedBy} minutes</p>
        </div>
      )}
    </div>
  );
}

export default SingleTrainPage;
