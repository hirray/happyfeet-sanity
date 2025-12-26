import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const games = [
  {
    id: 1,
    title: 'Memory Match',
    description: 'Test your memory with colorful cards',
    color: '#6c63ff'
  },
  {
    id: 2,
    title: 'Puzzle Adventure',
    description: 'Solve fun puzzles with HappyFeet',
    color: '#ff6b9d'
  },
  {
    id: 3,
    title: 'Color Splash',
    description: 'Create beautiful art with colors',
    color: '#4ecdc4'
  },
  {
    id: 4,
    title: 'Shape Sorter',
    description: 'Match shapes and learn',
    color: '#ffd166'
  }
];

const GameShowcase = () => {
  return (
    <Section>
      <SectionTitle>Our Fun Games</SectionTitle>
      <GamesGrid>
        {games.map((game, index) => (
          <GameCard 
            key={game.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
            style={{ '--color': game.color }}
          >
            <GameContent>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              <PlayButton whileTap={{ scale: 0.95 }}>
                Play Now
              </PlayButton>
            </GameContent>
          </GameCard>
        ))}
      </GamesGrid>
    </Section>
  );
};

const Section = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 4rem;
  color: #2d3436;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const GameCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--color);
  }
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const GameTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3436;
`;

const GameDescription = styled.p`
  color: #636e72;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const PlayButton = styled(motion.button)`
  background: #6c63ff;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a52d4;
    transform: translateY(-2px);
  }
`;

export default GameShowcase;
