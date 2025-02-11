import React, { useState, useEffect, useCallback } from 'react';
import './AttendancePage.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const AttendancePage = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const calculateEffectiveHours = (startTime, endTime, breakTime, isOnLeave, isLate, isEarlyLeave, isAWOL, overtime) => {
    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);

    let totalHoursWorked = (end - start) / 1000 / 60 / 60;
    totalHoursWorked -= breakTime;

    if (isOnLeave || isAWOL) {
      return 0;
    }

    if (isLate) {
      totalHoursWorked -= 0.5;
    }
    if (isEarlyLeave) {
      totalHoursWorked -= 0.5;
    }

    totalHoursWorked += overtime;

    return totalHoursWorked;
  };

  const calculateGrossHours = (startTime, endTime) => {
    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);

    let totalHoursWorked = (end - start) / 1000 / 60 / 60;

    return totalHoursWorked;
  };

  const fetchData = useCallback(() => {
    const newData = [
      {
        date: '26 Jun 2023',
        leave: 'N',
        startTime: '09:00',
        endTime: '17:00',
        breakTime: 1,
        arrival: 'on time',
        log: '✔',
        isLate: false,
        isEarlyLeave: false,
        isAWOL: false,
        overtime: 0
      },
      {
        date: '27 Jun 2023',
        leave: 'N',
        startTime: '09:00',
        endTime: '17:00',
        breakTime: 1,
        arrival: 'on time',
        log: '✔',
        isLate: false,
        isEarlyLeave: false,
        isAWOL: false,
        overtime: 0
      },
      {
        date: '29 Jun 2023',
        leave: 'N',
        startTime: '09:00',
        endTime: '17:00',
        breakTime: 1,
        arrival: '0:06:25 late',
        log: '❌',
        isLate: true,
        isEarlyLeave: false,
        isAWOL: false,
        overtime: 0
      },
      {
        date: '1 Jul 2023',
        leave: 'N',
        startTime: '09:00',
        endTime: '17:00',
        breakTime: 1,
        arrival: '-',
        log: 'WH',
        isLate: false,
        isEarlyLeave: false,
        isAWOL: false,
        overtime: 0
      },
      {
        date: '7 Jul 2023',
        leave: 'Y',
        startTime: '09:00',
        endTime: '17:00',
        breakTime: 1,
        arrival: '-',
        log: 'EL',
        isLate: false,
        isEarlyLeave: false,
        isAWOL: true,
        overtime: 0
      },
      // dummy data
    ];

    setTimeout(() => {
      setData((prevData) => [...prevData, ...newData]);
      if (data.length >= 100) {
        setHasMore(false);
      }
    }, 1000);
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="attendance-container">
      <h1 className="page-title">Attendance Page</h1>
      <div className="info-box">
        <div className="title-container-left">
          <h3 className="info-title">Log & Request</h3>
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
        scrollThreshold={0.9}
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
            {data.map((entry, index) => {
              const effectiveHours = calculateEffectiveHours(
                entry.startTime,
                entry.endTime,
                entry.breakTime,
                entry.leave === 'Y',
                entry.isLate,
                entry.isEarlyLeave,
                entry.isAWOL,
                entry.overtime
              );
              const grossHours = calculateGrossHours(entry.startTime, entry.endTime);
              return (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.leave}</td>
                  <td>{effectiveHours} hrs</td>
                  <td>{grossHours} hrs</td>
                  <td>{entry.arrival}</td>
                  <td>{entry.log}</td>
                </tr>
              );
            })}
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

