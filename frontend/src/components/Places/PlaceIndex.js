import { useSelector } from "react-redux";
import PlaceIndexItem from "./PlaceIndexItem";
import './PlaceIndex.scss';

const selectTrips = state => state.trips;

const PlaceIndex = () => {

  const trips = useSelector(selectTrips);

  const formatDate = (dateString) => {
    let setDate = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeDiff = setDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(setDate.valueOf() + timeDiff);
    return adjustedDate.toLocaleDateString("default", options);
  };

  const createDateRange = (startDate, end) => {
    let dateRangeArray = ["none"];
    let currentDate = new Date(startDate);
    // debugger
    let endDate = new Date(end);
    while(currentDate <= endDate) {
      dateRangeArray.push(formatDate(new Date(currentDate)));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateRangeArray;
  }
  
  const daySection = (dateRangeArray) => dateRangeArray.map((day) => {
    // let filterDay = dateRangeArray.includes(day) ? day : "Places to Go";
    return (
      <div key={day}>
        <h1 className="section-header">{day === "none" ? "Places to Go" : day}</h1>
        <h1 className="section-header">{day==="none" && trips.trip && trips.trip.locations && trips.trip.locations.length === 0 ? "No places added yet. Add your next destination using the map on the right!" : ""}</h1>
        <div className="place-index-container">
          {trips.trip && trips.trip.locations &&
            trips.trip.locations.map((place, index) => {
              if(!place.date) {
                place.date = "none";
              }
              if(place.date === day) {
                return (
                  <>
                    <PlaceIndexItem key={place._id} place={place} index={index} dateRange={createDateRange(trips.trip.startDate, trips.trip.endDate)}/>
                  </>
                )
              }
            }
            
          )}
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="top-border"></div>
      {trips.trip && daySection(createDateRange(trips.trip.startDate, trips.trip.endDate))}
      {/* <h1 className="places-header">Places to Go</h1>
      <div className="place-index-container"> */}
      {/* {trips.trip && trips.trip.locations &&
        trips.trip.locations.filter(place => !createDateRange(trips.trip.startDate, trips.trip.endDate).includes(place.date)).map((place, index) => (
          <>
            <h1 className="places-header">{"Places to Go"}</h1>
            <div className="place-index-container">
              <PlaceIndexItem key={place._id} place={place} index={index} dateRange={createDateRange(trips.trip.startDate, trips.trip.endDate)}/>
            </div>
          </>
        ))} */}
      {/* </div> */}
      {/* {trips.trip && daySection(createDateRange(trips.trip.startDate, trips.trip.endDate))} */}
    </div>
  );
}

export default PlaceIndex;
