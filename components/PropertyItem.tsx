import React, { ForwardedRef, forwardRef, useState } from 'react';
import { iProperty } from '../utils/interface';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  styled,
  Modal,
} from '@mui/material';
import ImageSlider from './ImageSlider';
import Image from 'next/image';

type PropertyItemType = {
  property: iProperty;
};

const ImageOverlay = styled('div')({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: '16px',
  cursor: 'pointer',
});

const CardImageContainer = styled('div')({
  position: 'relative',
  width: '36%',
  height: '100%',
});

const InfoContainer = styled('div')({
  width: '64%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});

const PropertyItem = forwardRef<HTMLDivElement, PropertyItemType>(
  ({ property }, ref: ForwardedRef<HTMLDivElement>) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOverlayClick = () => {
      setOpenModal(true);
    };

    const handleCloseModal = () => {
      setOpenModal(false);
    };

    return (
      <Card ref={ref} sx={{ width: '100%', height: 320, display: 'flex' }}>
        <CardImageContainer>
          <Image
            src={property.galleries[0].imageUrl}
            alt={`property-image-${property.id}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <ImageOverlay onClick={handleOverlayClick}>
            See all Images
          </ImageOverlay>
        </CardImageContainer>
        <InfoContainer>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              {property.projectName}
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {property.shortTitle}
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              Price: {property.price} B
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              Bedrooms: {property.bedrooms}
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              Area: {property.area} sq ft
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {property.shortDescription}
            </Typography>
          </CardContent>
        </InfoContainer>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              p: 4,
            }}
          >
            <ImageSlider images={property.galleries} />
            {/* <Typography id="modal-title" variant="h6" component="h2">
              Image Name
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Image content goes here...
            </Typography> */}
          </Box>
        </Modal>
      </Card>
    );
  }
);

PropertyItem.displayName = 'PropertyItem';

export default PropertyItem;
