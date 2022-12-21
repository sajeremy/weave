function PlaceIndexItem({ place }) {
  const [voteCount, setVoteCount] = useState(place.voteCount);

  const handleAdd = (e) => {
    setVoteCount(voteCount + 1);
    e.currentTarget.disabled = true;
  };

  const handleSubtract = (e) => {
    setVoteCount(voteCount - 1);
    e.currentTarget.disabled = true;
  };
  return (
    <>
      <div>{place.title}</div>
      <div>{place.category}</div>
      <div>{startDateTime}</div>
      <div>{endDateTime}</div>
      <div>
        <div>{voteCount}</div>
        <button onClick={handleAdd}>
          <i class="fa-solid fa-thumbs-up"></i>
        </button>
        <button onClick={handleSubtract}>
          <i class="fa-solid fa-hand-middle-finger"></i>
        </button>
      </div>
    </>
  );
}

export default PlaceIndexItem;
