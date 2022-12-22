import MemberIndexItem from "./MemberIndexItem";

function MemberIndex({ trip }) {
  return (
    <>
      <div>Members</div>

      {trip.members &&
        trip.members.map((member, index) => (
          <>
            <div></div>
            <MemberIndexItem key={member._id} member={member} index={index} />
          </>
        ))}
    </>
  );
}

export default MemberIndex;
