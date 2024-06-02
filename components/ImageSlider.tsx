import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';
import { Gallery } from '@prisma/client';
import Image from 'next/image';

type PropType = {
  images: Gallery[];
};

const ImageSlider = ({ images }: PropType) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <Box
      {...handlers}
      sx={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            width: index === currentIndex ? '70vw' : 0,
            height: index === currentIndex ? '50vh' : 0,
            maxWidth: 700,
            margin: '0 auto',
            overflow: 'hidden',
            visibility: index === currentIndex ? 'visible' : 'hidden',
          }}
        >
          <Image
            src={image.imageUrl}
            alt={`Slide ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            objectFit="cover"
          />
          <Typography
            variant="subtitle1"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              textAlign: 'center',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '8px',
            }}
          >
            Image {currentIndex + 1}
          </Typography>
        </Box>
      ))}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.7)' },
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.7)' },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default ImageSlider;
