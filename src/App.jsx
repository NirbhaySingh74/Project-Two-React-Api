import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await fetch("https://randomuser.me/api?results=50");
        const result = await respone.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="user-list">
          {data.results.map((user, index) => (
            <div key={index} className="user-item">
              <img
                src={user.picture.thumbnail}
                alt="User Thumbnail"
                className="user-image"
              />
              <div className="user-details">
                <p>Hi, my name is</p>
                <p className="user-name">{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
