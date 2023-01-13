function InvitedUsersIndexItem({ user }) {
  return (
    <>
      <div className="name-wrapper">
        {user.firstName} {user.lastName}
      </div>
      <div> {user.email}</div>
    </>
  );
}
export default InvitedUsersIndexItem;
