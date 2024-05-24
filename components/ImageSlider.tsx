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
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Box
      {...handlers}
      sx={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '70vw', // Set the initial width to 70% of the viewport width
          maxWidth: 700, // Set the maximum width to 700px
          margin: '0 auto', // Center the box horizontally
          overflow: 'hidden', // Ensure the box doesn't exceed the specified width
        }}
      >
        <Image
          src={images[currentIndex].imageUrl}
          alt={`Slide ${currentIndex + 1}`}
          width={700} // Set the width of the image to 700px
          height={400} // Set a default height for optimal loading
          layout="responsive" // Make the image responsive
          objectFit="cover"
        />
      </Box>
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
