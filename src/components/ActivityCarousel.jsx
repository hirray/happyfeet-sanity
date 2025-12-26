import React from 'react';
import styled from 'styled-components';

// Array of image paths
const cardImages = [
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpg',
  '/img4.jpg',
  '/img5.jpg',
  '/img6.jpg',
  '/img7.jpg',
  '/img8.jpg',
  '/img9.jpg',
  '/img10.jpg'
];

// Helper function to generate colors for cards
function getColorForIndex(index) {
  const colors = [
    '142, 249, 252',
    '142, 252, 204',
    '142, 252, 157',
    '215, 252, 142',
    '252, 252, 142',
    '252, 208, 142',
    '252, 142, 142',
    '252, 142, 239',
    '204, 142, 252',
    '142, 202, 252'
  ];
  return colors[index % colors.length];
}

const ActivityCarousel = () => {
  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="inner" style={{'--quantity': cardImages.length}}>
          {cardImages.map((img, index) => (
            <div 
              key={index}
              className="card" 
              style={{
                '--index': index, 
                '--color-card': getColorForIndex(index)
              }}
            >
              <div 
                className="img" 
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 500px; /* Reduced height */
  position: relative;
  margin: 0 0 3rem 0; /* Added more bottom margin for Featured Activities spacing */
  z-index: 1;
  overflow: visible;

  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }

  .inner {
    --w: 140px; /* Further reduced width */
    --h: 200px; /* Further reduced height */
    --translateZ: calc((var(--w) + var(--h)) + 0px);
    --rotateX: -15deg;
    --perspective: 1000px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    top: 50%;
    transform: translateY(-50%);
    left: calc(50% - (var(--w) / 2) - 2.5px);
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective));
    animation: rotating 20s linear infinite;
  }

  @keyframes rotating {
    from {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(0);
    }
    to {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(1turn);
    }
  }

  .card {
    position: absolute;
    border: 3px solid rgba(var(--color-card));
    border-radius: 12px;
    overflow: hidden;
    inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
      translateZ(var(--translateZ));
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
        translateZ(calc(var(--translateZ) * 1.1));
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    }
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default ActivityCarousel;
