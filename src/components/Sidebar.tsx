import "./sidebar.css";
import avatar from "../images/avatar.png";
const UserHeader = () => {
  return (
    <div className="userheader">
      <img src={avatar}></img>
      <div className="userinfo">
        <h3>User</h3>
        <p>Free Plan</p>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      <UserHeader />
      <div className="sidebar">
        <div className="mylist">
          <h3>My Lists</h3>
          <ul>
            <li>Personal</li>
            <li>Work</li>
            <li>Hobby</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
