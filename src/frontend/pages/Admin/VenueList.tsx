import { RootState, useSelector } from 'frontend/redux/store';
import React from 'react';
import { Table } from 'react-bootstrap';
import '../../material/admin.css';

const VenueList = () => {
  const { lstVanue } = useSelector((rootState: RootState) => rootState.admin);
  return (
    <>
      <h1>Show Venue</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Venue Name</th>
            <th> Venue Address</th>
            <th> Google Map</th>
          </tr>
        </thead>
        <tbody>
          {lstVanue.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.venueName}</td>
              <td>{item.venueAddress}</td>
              <td>{item.venueGmap}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default VenueList;
