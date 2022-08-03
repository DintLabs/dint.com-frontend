import { createVenue, fetchVanues } from 'frontend/redux/slices/admin';
import { dispatch } from 'frontend/redux/store';
import { IVenue } from 'frontend/types/event';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../material/admin.css';

const AddVenue = () => {
  const [objVenue, setObjVenue] = useState<IVenue>({} as IVenue);

  const createVanue = async () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    if (objVenue.venueName !== '' || objVenue.venueAddress !== '') {
      const venueData: IVenue = {
        venueName: objVenue.venueName,
        venueAddress: objVenue.venueAddress,
        venueGmap: objVenue.venueGmap,
        venuedateCreated: `${yyyy}-${mm}-${dd}`
      };
      await createVenue(venueData);
      alert('Vanue Saved Success');
      setObjVenue({ venueName: '', venueAddress: '', venueGmap: '' } as IVenue);
      dispatch(fetchVanues());
    } else {
      alert('please fill all fields in vanue form');
    }
  };

  return (
    <>
      <h1>Add Venue</h1>
      <Form.Group className="mb-3">
        <Form.Label>Venue Name</Form.Label>
        <Form.Control
          type="text"
          value={objVenue.venueName || ''}
          onChange={(e: any) => {
            setObjVenue({
              ...objVenue,
              venueName: e.target.value
            });
          }}
          placeholder="Venue Name Here"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={objVenue.venueAddress || ''}
          onChange={(e: any) => {
            setObjVenue({
              ...objVenue,
              venueAddress: e.target.value
            });
          }}
          placeholder="Address Here"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address Link (Optional)</Form.Label>
        <Form.Control
          type="text"
          value={objVenue.venueGmap || ''}
          onChange={(e: any) => {
            setObjVenue({
              ...objVenue,
              venueGmap: e.target.value
            });
          }}
          placeholder="Add Google map Link Here"
        />
      </Form.Group>

      <Button variant="primary" onClick={createVanue}>
        Submit
      </Button>
    </>
  );
};
export default AddVenue;
