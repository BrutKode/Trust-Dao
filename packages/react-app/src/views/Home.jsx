import { Divider } from "antd";
import "./css/Home.css";

export default function Home() {
  return (
    <>
      <div className="main">
        <h1 className="heading left-align">
          <strong>Welcome to the Trust DAO</strong>
        </h1>
        <ul className="left-align">
          <li>Join Us by hiring your first developer</li>
          <li>Pay for the work they are executing and have no worries</li>
          <li>Trust us and we will provide you with your requirements!</li>
        </ul>
      </div>
      <Divider />
    </>
  );
}
