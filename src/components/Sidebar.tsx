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

interface SideProps {
  categories: Array<string>;
}

const Sidebar = (props: SideProps) => {
  const { categories } = props;
  return (
    <>
      <UserHeader />
      <div className="sidebar">
        <div className="mylist">
          <h3>My Lists</h3>
          <ul>
            {categories.map((category, i) => {
              return <li key={i}>{category}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
