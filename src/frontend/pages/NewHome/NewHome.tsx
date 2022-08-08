import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../material/tickets.css';

const NewHome = () => {
  useEffect(() => {
    console.log('I am in use effect');
  }, []);
  return (
    <>
      <Helmet>
        <title>Din't Home</title>
        <meta
          name="description"
          content="Dint Events, buy event tickets. Use your digital assets to create event tickets"
        />
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          bgcolor: 'background.default'
        }}
      >
        <Container>
          <Box sx={{ mt: 3 }} />
          <Box sx={{ p: 2 }}>New Home Under construction</Box>
        </Container>
      </Box>
    </>
  );
};

export default NewHome;
