import React from 'react';
import { Box, Typography, Container, Card, Button, Link } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/system';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';

function Page4({ final }) {
  console.log(final);
  return (
    <div>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Typography variant="h4">ΕΥΧΑΡΙΣΤΟΥΜΕ ΓΙΑ ΤΗΝ ΠΡΟΤΙΜΗΣΗ</Typography>
          <Card
            sx={{
              width: '70%',
              padding: '10px 20px',
              marginTop: '30px',
              border: '1px solid #ffb30b',
              boxShadow: 'none',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6">Εισιτήριο Εκδρομής</Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: '10px' }}>
                <Divider />
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="subtitle2">ΟΝΟΜΑΤΕΠΩΝΥΜΟ:</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>
                  {final.userInfo.firstName0} {final.userInfo.lastName0}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <Typography variant="subtitle2">ΚΑΡΑΒΙ:</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>
                  Πέλαγος 2
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <Typography variant="subtitle2">Α. ΚΡΑΤΗΣΗΣ:</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>
                  64984651
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  // alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <Typography variant="subtitle2">ΑΠΟ: </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>
                    {final.thankyouPageData.displayCardData.portName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <Typography variant="subtitle2">ΠΡΟΣ:</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>
                    {final.thankyouPageData.displayCardData.cruiseName}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <Typography variant="subtitle2">ΗΜΕΡΟΜΗΝΙΑ: </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>
                  {final.thankyouPageData.fullDate}
                </Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid
                item
                xs={6}
                sx={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="button"
                  sx={{
                    textDecoration: 'underline',
                    color: '#0052b4',
                    fontSize: '18px',
                  }}
                >
                  ΑΡΙΘΜΟΣ
                </Typography>
                <Typography
                  variant="button"
                  sx={{
                    textDecoration: 'underline',
                    color: '#0052b4',
                    fontSize: '18px',
                  }}
                >
                  ΑΤΟΜΩΝ
                </Typography>
                <Typography
                  variant="button"
                  sx={{
                    color: '#ffb30b',
                    fontSize: '18px',
                  }}
                >
                  {final.thankyouPageData.totalTickets}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="button"
                  sx={{
                    textDecoration: 'underline',
                    color: '#0052b4',
                    fontSize: '18px',
                  }}
                >
                  ΩΡΑ
                </Typography>
                <Typography
                  variant="button"
                  sx={{
                    textDecoration: 'underline',
                    color: '#0052b4',
                    fontSize: '18px',
                  }}
                >
                  ΑΝΑΧΩΡΗΣΗΣ
                </Typography>
                <Typography
                  variant="button"
                  sx={{
                    color: '#ffb30b',
                    fontSize: '18px',
                  }}
                >
                  {final.departureTime}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '50px',
            marginTop: '30px',
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#ffb30b',
              color: '#000',
              ': hover': {
                backgroundColor: '#e6a10a',
                color: '#1a1a1a',
              },
            }}
          >
            ΛΗΨΗ ΣΕ ΜΟΡΦΗ PDF
          </Button>
          <Link
            href={final.thankyouPageData.displayCardData?.urlWithDetails}
            underline="always"
            variant="h6"
          >
            ΠΕΡΙΣΣΟΤΕΡΕΣ ΠΛΗΡΟΦΟΡΙΕΣ
          </Link>
        </Box>
      </Container>
    </div>
  );
}

export default Page4;
