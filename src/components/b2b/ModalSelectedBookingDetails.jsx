import React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { nextStepContext } from '../Context/NextStepContextProvider';
import { ListItem, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';
import ListItemIcon from '@mui/material/ListItemIcon';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    md: 600,
    xs: 380,
  },
  maxHeight: {
    md: 800,
    xs: 550,
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  border: 'none',
  p: 4,
  overflow: 'scroll',
};

function ModalSelectedBookingDetails({ data }) {
  const { nextStepObj, setNextStepObj } = React.useContext(nextStepContext);

  //   selectedBookingId
  const clickHandler = () => {
    setNextStepObj({
      ...nextStepObj,
      selectedBookingModal: !nextStepObj.selectedBookingModal,
    });
  };

  const [displayedList, setDisplayedList] = React.useState(null);
  React.useEffect(() => {
    if (nextStepObj?.selectedBookingId) {
      const temp = data.filter(
        e => e.bookingId === nextStepObj.selectedBookingId
      );

      const tempListItems = temp[0].details.map((value, index) => {
        return (
          <Box key={`listItemId${index}`}>
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '20px',
                gap: '2px',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  alignSelf: 'center',
                  padding: '20px 0 30px 0',
                  fontWeight: '500',
                }}
              >
                {index === 0 ? 'Leader Επιβάτης' : `Επιβάτης ${index + 1}`}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`${value.firstName} ${value.lastName}`}
                  sx={{ width: '150px', marginLeft: '-20px' }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>
                  <EmailIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`${value.email} `}
                  sx={{ width: '150px', marginLeft: '-20px' }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>
                  <PhoneIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`${value.phoneNumber} `}
                  sx={{ width: '100px', marginLeft: '-20px' }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>
                  <CalendarTodayIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`${value.dateOfBirth} `}
                  sx={{ width: '100px', marginLeft: '-20px' }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>
                  <PublicIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={`${value.nationality.name} `}
                  sx={{ width: '100px', marginLeft: '-20px' }}
                />
              </Box>
            </ListItem>
            <Divider />
          </Box>
        );
      });
      setDisplayedList(
        <List>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <Typography variant="h6">
              ΑΡΙΘΜΟΣ ΚΡΑΤΗΣΗΣ: {nextStepObj.selectedBookingId}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {nextStepObj.selectedBookingCardInfo.name} ΑΠΟ{' '}
              {nextStepObj.selectedBookingCardInfo.portName}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {nextStepObj.selectedBookingFullDate} (
              {nextStepObj.selectedBookingCardInfo.departureTime} -{' '}
              {nextStepObj.selectedBookingCardInfo.returnTime})
            </Typography>

            {nextStepObj.selectedBookingComment !== '' && (
              <Typography
                variant="body1"
                sx={{ fontWeight: '500', margin: '20px 0 40px 0' }}
              >
                Σχόλιο: {nextStepObj.selectedBookingComment}
              </Typography>
            )}
          </Box>
          {tempListItems}
        </List>
      );
    }
  }, [nextStepObj.selectedBookingId]);

  return (
    <Modal
      open={Boolean(nextStepObj?.selectedBookingModal)}
      onClose={clickHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ maxHeight: '400' }}
    >
      <Box sx={style}>{displayedList}</Box>
    </Modal>
  );
}

export default ModalSelectedBookingDetails;
