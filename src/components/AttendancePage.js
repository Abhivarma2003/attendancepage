import React, { useState, useEffect } from 'react';
import './AttendancePage.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const AttendancePage = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Simulating a server call to fetch data
  const fetchData = () => {
    // Normally, you'd fetch data from an API here, for now, we simulate it
    const newData = [
      { date: '26 Jun 2023', leave: 'N', effectiveHours: '9:00 hrs', grossHours: '9:00 hrs', arrival: 'on time', log: '✔' },
      { date: '27 Jun 2023', leave: 'N', effectiveHours: '9:00 hrs', grossHours: '9:00 hrs', arrival: 'on time', log: '✔' },
      { date: '29 Jun 2023', leave: 'N', effectiveHours: '9:00 hrs', grossHours: '9:00 hrs', arrival: '0:06:25 late', log: '❌' },
      { date: '1 Jul 2023', leave: 'N', effectiveHours: '0:00 hrs', grossHours: '0:00 hrs', arrival: '-', log: 'WH' },
      { date: '7 Jul 2023', leave: 'Y', effectiveHours: '0:00 hrs', grossHours: '0:00 hrs', arrival: '-', log: 'EL' },
      // Add more dummy data for testing
    ];
    
    setTimeout(() => {
      setData((prevData) => [...prevData, ...newData]);
      if (data.length >= 100) { // Limit the data to simulate an endpoint
        setHasMore(false);
      }
    }, 1000);  // Simulate delay in fetching data
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="attendance-container">
      <h1 className="page-title">Attendance Page</h1>
      <div className="info-box">
        <div className="title-container-left">
          <h3 className="info-title">Log& Request</h3>
        </div>
        <div className="button-container-right">
          <button className="info-heading">Attendance Log</button>
          <button className="info-heading">Attendance Requests</button>
        </div>
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data to load.</p>}
        scrollThreshold={0.9}  // Load data when 90% of the page is scrolled
        scrollableTarget="scrollableDiv"
      >
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Leave</th>
              <th>Effective Hours</th>
              <th>Gross Hours</th>
              <th>Arrival</th>
              <th>Log</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.leave}</td>
                <td>{entry.effectiveHours}</td>
                <td>{entry.grossHours}</td>
                <td>{entry.arrival}</td>
                <td>{entry.log}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default AttendancePage;
