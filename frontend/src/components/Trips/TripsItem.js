function TripsItem({ trip }) {
  return (
    <>
      <div>{trip.name}</div>
      <div>{trip.description}</div>
      <div>{trip.startDate}</div>
      <div>{trip.endDate}</div>
    </>
  );
}

export default TripsItem;
