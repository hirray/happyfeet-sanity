// src/components/InfoCards.jsx
import React from 'react';
import styled from 'styled-components';

const InfoCards = () => {
  const infoItems = [
    {
      id: 1,
      icon: '🏢',
      title: 'Company',
      description: 'HappyFeet Activity Club',
      color: '#6c63ff',
      hoverColor: '#5649e6',
      tooltipPosition: 'left'  // Added position for each card
    },
    {
      id: 2,
      icon: '📅',
      title: 'Founded',
      description: '2010',
      color: '#03A9F4',
      hoverColor: '#0398dc',
      tooltipPosition: 'right'
    },
    {
      id: 3,
      icon: '📍',
      title: 'Location',
      description: 'Worldwide',
      color: '#4CAF50',
      hoverColor: '#3d8b40',
      tooltipPosition: 'left'
    },
    {
      id: 4,
      icon: '🎯',
      title: 'Specialty',
      description: 'Creative Events',
      color: '#FF9800',
      hoverColor: '#e68a00',
      tooltipPosition: 'right'
    }
  ];

  return (
    <StyledWrapper>
      <AnimationContainer>
        <AnimatedCircle size="400px" color="rgba(108, 99, 255, 0.1)" delay="0s" />
        <AnimatedCircle size="500px" color="rgba(3, 169, 244, 0.08)" delay="-5s" />
        <div className="main">
          <div className="up">
            {infoItems.slice(0, 2).map((item) => (
              <InfoCard key={item.id} item={item} position="up" />
            ))}
          </div>
          <div className="down">
            {infoItems.slice(2, 4).map((item) => (
              <InfoCard key={item.id} item={item} position="down" />
            ))}
          </div>
        </div>
      </AnimationContainer>
    </StyledWrapper>
  );
};

const InfoCard = ({ item, position }) => {
  const getBorderRadius = () => {
    switch (position) {
      case 'up':
        return item.id % 2 === 1 
          ? '120px 5px 5px 5px' 
          : '5px 120px 5px 5px';
      case 'down':
        return item.id % 2 === 1 
          ? '5px 5px 5px 120px' 
          : '5px 5px 120px 5px';
      default:
        return '5px';
    }
  };

  return (
    <Card 
      className={`card${item.id}`}
      style={{ 
        '--color': item.color,
        '--hover-color': item.hoverColor,
        '--border-radius': getBorderRadius(),
        '--tooltip-position': item.tooltipPosition
      }}
    >
      <div className="icon">{item.icon}</div>
      <div className="tooltip">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </Card>
  );
};

const AnimationContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
`;

const AnimatedCircle = styled.div`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background: ${props => props.color};
  animation: pulse 15s infinite alternate ${props => props.delay};
  z-index: 0;

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
`;

const StyledWrapper = styled.div`
  .main {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 1em;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .up, .down {
    display: flex;
    justify-content: center;
    gap: 2em;
  }

  @media (max-width: 600px) {
    .up, .down {
      flex-direction: column;
      align-items: center;
      gap: 1em;
    }
  }
`;

const Card = styled.div`
  width: 120px;
  height: 120px;
  outline: none;
  border: none;
  background: white;
  border-radius: ${props => props.style['--border-radius']};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, 
              rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  z-index: 1;

  .icon {
    font-size: 2.2em;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 1em;
    border-radius: 8px;
    font-size: 0.9em;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: max-content;
    max-width: 200px;
    z-index: 10;
    pointer-events: none;
    
    /* Position based on tooltipPosition prop */
    ${props => {
      const isLeft = props.style['--tooltip-position'] === 'left';
      return isLeft 
        ? `
          right: calc(100% + 15px);
          top: 50%;
          transform: translateY(-50%);
          
          &::after {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: transparent transparent transparent rgba(0, 0, 0, 0.9);
          }
        `
        : `
          left: calc(100% + 15px);
          top: 50%;
          transform: translateY(-50%);
          
          &::after {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: transparent rgba(0, 0, 0, 0.9) transparent transparent;
          }
        `;
    }}

    h3 {
      margin: 0 0 0.3em 0;
      color: var(--color);
      font-size: 1.1em;
    }

    p {
      margin: 0;
      color: #f0f0f0;
      font-weight: 300;
    }
  }

  &:hover {
    transform: scale(1.1);
    background-color: var(--hover-color);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    z-index: 2;

    .icon {
      color: white;
      transform: scale(1.1);
    }

    .tooltip {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: 600px) {
    width: 100px;
    height: 100px;

    .icon {
      font-size: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .tooltip {
      /* On mobile, show tooltips above the cards */
      left: 50% !important;
      right: auto !important;
      bottom: calc(100% + 15px);
      top: auto !important;
      transform: translateX(-50%) !important;
      
      &::after {
        top: 100% !important;
        left: 50% !important;
        right: auto !important;
        transform: translateX(-50%) !important;
        border: 8px solid transparent !important;
        border-top-color: rgba(0, 0, 0, 0.9) !important;
      }
    }
  }
`;

export default InfoCards;