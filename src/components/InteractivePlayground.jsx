import { useState, useCallback, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const BUBBLE_COLORS = [
  'hsl(0, 80%, 65%)',
  'hsl(25, 95%, 60%)',
  'hsl(45, 100%, 65%)',
  'hsl(140, 70%, 50%)',
  'hsl(175, 70%, 50%)',
  'hsl(210, 90%, 60%)',
  'hsl(270, 70%, 65%)',
  'hsl(330, 80%, 70%)',
];

const HANGMAN_WORDS = ['HAPPY', 'PARTY', 'GAMES', 'DANCE', 'MUSIC', 'SMILE', 'LAUGH', 'ENJOY'];

// 3D Interactive Cubes Component
const InteractiveCubes = () => {
  return (
    <CubeGameBox $gradient="from-game-blue/10 to-game-purple/10">
      <CubeContainer>
        <CubeGroup>
          <Cube $index={1}>
            <CubeColumn $x={-1} $y={0}>
              <CubeSpan $i={3} />
              <CubeSpan $i={2} />
              <CubeSpan $i={1} />
            </CubeColumn>
            <CubeColumn $x={0} $y={0}>
              <CubeSpan $i={3} />
              <CubeSpan $i={2} />
              <CubeSpan $i={1} />
            </CubeColumn>
            <CubeColumn $x={1} $y={0}>
              <CubeSpan $i={3} />
              <CubeSpan $i={2} />
              <CubeSpan $i={1} />
            </CubeColumn>
          </Cube>
          <Cube $index={2}>
            <CubeColumn $x={-1} $y={0}>
              <CubeSpan $i={3} />
              <CubeSpan $i={2} />
              <CubeSpan $i={1} />
            </CubeColumn>
            <CubeColumn $x={0} $y={0}>
              <CubeSpan $i={3} />
              <CubeSpan $i={2} />
              <CubeSpan $i={1} />
            </CubeColumn>
            <CubeColumn $x={1} $y={0}>
              <CubeSpan $i={3} />
              <CubeSpan $i={2} />
              <CubeSpan $i={1} />
            </CubeColumn>
          </Cube>
          <Cube $index={3}>
            <CubeColumn $x={-1} $y={0}>
              <CubeSpan $i={3} />
              <CubeSpan $i={2} />
              <CubeSpan $i={1} />
            </CubeColumn>
            <CubeColumn $x={0} $y={0}>
              <CubeSpan $i={3} />
              <CubeSpan $i={2} />
              <CubeSpan $i={1} />
            </CubeColumn>
            <CubeColumn $x={1} $y={0}>
              <CubeSpan $i={3} />
              <CubeSpan $i={2} />
              <CubeSpan $i={1} />
            </CubeColumn>
          </Cube>
        </CubeGroup>
      </CubeContainer>
      <GameHint>Hover over the cubes!</GameHint>
    </CubeGameBox>
  );
};

// Bubble Pop Game
const BubblePopGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  const createBubble = useCallback(() => {
    const newBubble = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      size: Math.random() * 30 + 25,
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
      popped: false,
    };
    setBubbles(prev => [...prev.slice(-20), newBubble]);
  }, []);

  useEffect(() => {
    const interval = setInterval(createBubble, 800);
    return () => clearInterval(interval);
  }, [createBubble]);

  const popBubble = (id, e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setRipples(prev => [...prev, { id: Date.now(), x, y }]);
      setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, 600);
    }

    setBubbles(prev => prev.map(b => 
      b.id === id ? { ...b, popped: true } : b
    ));
    setScore(prev => prev + 1);
    
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 300);
  };

  return (
    <GameBox ref={containerRef} $gradient="from-game-teal/10 to-game-green/10">
      <ScoreDisplay>Pop: {score} 🎈</ScoreDisplay>

      {ripples.map(ripple => (
        <Ripple
          key={ripple.id}
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
          }}
        />
      ))}

      {bubbles.map(bubble => (
        <Bubble
          key={bubble.id}
          $popped={bubble.popped}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
          }}
          onClick={(e) => popBubble(bubble.id, e)}
        >
          <BubbleShine />
        </Bubble>
      ))}

      <GameHint>Pop the bubbles! 🫧</GameHint>
    </GameBox>
  );
};

// Magic Wand
const MagicWand = () => {
  const [sparkles, setSparkles] = useState([]);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && Math.random() > 0.5) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newSparkle = { id: Date.now() + Math.random(), x, y };
      setSparkles(prev => [...prev.slice(-30), newSparkle]);
      
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 1000);
    }
  };

  return (
    <GameBox
      ref={containerRef}
      $gradient="from-game-yellow/10 to-game-orange/10"
      onMouseMove={handleMouseMove}
      style={{ cursor: 'none' }}
    >
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
        >
          ✨
        </Sparkle>
      ))}

      <GameHint style={{ pointerEvents: 'none' }}>
        Wave your cursor around to create magic! ✨🪄
      </GameHint>
    </GameBox>
  );
};

// Color Mixer
const ColorMixer = () => {
  const [colors, setColors] = useState({
    red: 50,
    green: 50,
    blue: 50,
  });

  const mixedColor = `rgb(${Math.round(colors.red * 2.55)}, ${Math.round(colors.green * 2.55)}, ${Math.round(colors.blue * 2.55)})`;

  return (
    <GameBox $gradient="from-game-purple/10 to-game-pink/10">
      <ColorMixerTitle>Color Mixer 🎨</ColorMixerTitle>
      
      <ColorMixerContent>
        <SliderContainer>
          {['red', 'green', 'blue'].map(color => (
            <SliderRow key={color}>
              <ColorLabel>{color}</ColorLabel>
              <ColorSlider
                type="range"
                min="0"
                max="100"
                value={colors[color]}
                onChange={(e) => setColors(prev => ({ ...prev, [color]: Number(e.target.value) }))}
                $color={color}
              />
            </SliderRow>
          ))}
        </SliderContainer>

        <ColorPreview style={{ backgroundColor: mixedColor }} />
      </ColorMixerContent>
    </GameBox>
  );
};

// Tic Tac Toe
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <GameBox $gradient="from-game-red/10 to-game-orange/10">
      <TicTacToeTitle>Tic Tac Toe ❌⭕</TicTacToeTitle>
      
      {winner && <WinnerMessage>{winner} Wins! 🎉</WinnerMessage>}
      {!winner && board.every(cell => cell) && <WinnerMessage>Draw! 🤝</WinnerMessage>}
      
      <TicTacToeBoard>
        {board.map((cell, index) => (
          <TicTacToeCell
            key={index}
            onClick={() => handleClick(index)}
            $hasValue={!!cell}
          >
            {cell}
          </TicTacToeCell>
        ))}
      </TicTacToeBoard>
      
      <ResetButton onClick={resetGame}>Reset Game</ResetButton>
    </GameBox>
  );
};

// Hangman Game
const Hangman = () => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrong = 6;

  useEffect(() => {
    setWord(HANGMAN_WORDS[Math.floor(Math.random() * HANGMAN_WORDS.length)]);
  }, []);

  const guessLetter = (letter) => {
    if (guessedLetters.includes(letter) || wrongGuesses >= maxWrong) return;
    
    setGuessedLetters([...guessedLetters, letter]);
    
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const displayWord = word.split('').map(letter => 
    guessedLetters.includes(letter) ? letter : '_'
  ).join(' ');

  const isWon = word.split('').every(letter => guessedLetters.includes(letter));
  const isLost = wrongGuesses >= maxWrong;

  const resetGame = () => {
    setWord(HANGMAN_WORDS[Math.floor(Math.random() * HANGMAN_WORDS.length)]);
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <GameBox $gradient="from-game-blue/10 to-game-purple/10">
      <HangmanTitle>Hangman 🎯</HangmanTitle>
      
      <HangmanWord>{displayWord}</HangmanWord>
      <WrongCount>Wrong: {wrongGuesses}/{maxWrong}</WrongCount>
      
      {isWon && <WinnerMessage>You Won! 🎉</WinnerMessage>}
      {isLost && <WinnerMessage>Game Over! Word was: {word}</WinnerMessage>}
      
      <LetterGrid>
        {alphabet.map(letter => (
          <LetterButton
            key={letter}
            onClick={() => guessLetter(letter)}
            $disabled={guessedLetters.includes(letter) || isWon || isLost}
            $correct={guessedLetters.includes(letter) && word.includes(letter)}
            $wrong={guessedLetters.includes(letter) && !word.includes(letter)}
          >
            {letter}
          </LetterButton>
        ))}
      </LetterGrid>
      
      <ResetButton onClick={resetGame}>New Word</ResetButton>
    </GameBox>
  );
};

// Main Component
const InteractivePlayground = () => {
  return (
    <Section>
      <TitleContainer>
        <MainTitle>
          <RainbowText>Interactive</RainbowText> Playground
        </MainTitle>
        <Subtitle>Play with these fun interactive elements!</Subtitle>
      </TitleContainer>

      <GamesGrid>
        <GameItem>
          <GameTitle>🎲 3D Interactive Cubes</GameTitle>
          <InteractiveCubes />
        </GameItem>
        
        <GameItem>
          <GameTitle>🎈 Bubble Pop</GameTitle>
          <BubblePopGame />
        </GameItem>
        
        <GameItem>
          <GameTitle>🪄 Magic Sparkles</GameTitle>
          <MagicWand />
        </GameItem>
        
        <GameItem>
          <GameTitle>🎨 Mix Colors</GameTitle>
          <ColorMixer />
        </GameItem>
        
        <GameItem>
          <GameTitle>❌⭕ Tic Tac Toe</GameTitle>
          <TicTacToe />
        </GameItem>
        
        <GameItem>
          <GameTitle>🎯 Hangman</GameTitle>
          <Hangman />
        </GameItem>
      </GamesGrid>
    </Section>
  );
};

// Styled Components
const rippleAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
`;

const sparkleAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
    opacity: 0;
  }
`;

const Section = styled.section`
  padding: 6rem 0;
  background: transparent;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const MainTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const RainbowText = styled.span`
  background: linear-gradient(
    90deg,
    #ff6b6b 0%,
    #f9ca24 20%,
    #6ab04c 40%,
    #4834d4 60%,
    #e056fd 80%,
    #ff6b6b 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: gradient-shift 3s linear infinite;
  
  @keyframes gradient-shift {
    0% {
      background-position: 0% center;
    }
    100% {
      background-position: 200% center;
    }
  }
`;

const Subtitle = styled.p`
  color: #636e72;
  font-size: 1.2rem;
`;

const GamesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
`;

const GameItem = styled(motion.div).attrs({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
})`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const GameTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  color: #2d3436;
`;

const GameBox = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: linear-gradient(to bottom right, ${props => props.$gradient || 'transparent'});
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    height: 280px;
  }
`;

const CubeGameBox = styled(GameBox)`
  height: auto;
  min-height: 300px;
  padding: 2.5rem 1.5rem 2rem;
  overflow: visible;
`;

const cubeHueRotate = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`;

const CubeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  padding: 1rem 0;
`;

const CubeGroup = styled.div`
  position: relative;
  transform: translateY(-65px) scale(0.85) skewY(-18deg);
  transform-origin: center;
  animation: ${cubeHueRotate} 5s linear infinite;
`;

const Cube = styled.div`
  position: relative;
  z-index: ${props => props.$index === 2 ? 1 : props.$index === 3 ? 3 : 2};
  transform: ${props => 
    props.$index === 2 ? 'translate(-30px, -30px)' : 
    props.$index === 3 ? 'translate(30px, 30px)' : 
    'translate(0, 0)'
  };
`;

const CubeColumn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transform: translate(
    calc(-35px * ${props => props.$x}),
    calc(-30px * ${props => props.$y})
  );
  
  @media (min-width: 768px) {
    gap: 20px;
    transform: translate(
      calc(-45px * ${props => props.$x}),
      calc(-40px * ${props => props.$y})
    );
  }
`;

const CubeSpan = styled.span`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  background: #dcdcdc;
  z-index: ${props => props.$i};
  transition: 1.5s;
  cursor: pointer;
  
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
  
  &:hover {
    transition: 0s;
    background: #ef4149;
    filter: drop-shadow(0 0 20px #ef4149);
    
    &:before,
    &:after {
      transition: 0s;
      background: #ef4149;
    }
  }
  
  &:before {
    content: "";
    position: absolute;
    left: -25px;
    width: 25px;
    height: 100%;
    background: #fff;
    transform-origin: right;
    transform: skewY(45deg);
    transition: 1.5s;
    
    @media (min-width: 768px) {
      left: -30px;
      width: 30px;
    }
  }
  
  &:after {
    content: "";
    position: absolute;
    top: -25px;
    left: 0;
    width: 100%;
    height: 25px;
    background: #f2f2f2;
    transform-origin: bottom;
    transform: skewX(45deg);
    transition: 1.5s;
    
    @media (min-width: 768px) {
      top: -30px;
      height: 30px;
    }
  }
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50px;
  font-weight: 700;
  color: #2d3436;
  z-index: 10;
`;

const Ripple = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid hsl(45, 100%, 60%);
  animation: ${rippleAnimation} 0.6s ease-out;
  pointer-events: none;
`;

const Bubble = styled.div`
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%) scale(${props => props.$popped ? 0 : 1});
  opacity: ${props => props.$popped ? 0 : 1};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const BubbleShine = styled.div`
  position: absolute;
  top: 25%;
  left: 25%;
  width: 25%;
  height: 25%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
`;

const Sparkle = styled.div`
  position: absolute;
  font-size: 1.5rem;
  animation: ${sparkleAnimation} 1s ease-out forwards;
  pointer-events: none;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const ColorMixerTitle = styled.h4`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #2d3436;
`;

const ColorMixerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const SliderContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ColorLabel = styled.span`
  width: 60px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: capitalize;
  color: #2d3436;
`;

const ColorSlider = styled.input`
  flex: 1;
  height: 12px;
  border-radius: 6px;
  appearance: none;
  cursor: pointer;
  background: ${props => {
    if (props.$color === 'red') return 'linear-gradient(to right, #ddd, hsl(0, 80%, 55%))';
    if (props.$color === 'green') return 'linear-gradient(to right, #ddd, hsl(140, 70%, 45%))';
    return 'linear-gradient(to right, #ddd, hsl(210, 90%, 55%))';
  }};
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

const ColorPreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 4px solid white;
  transition: background-color 0.3s ease;
  
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const TicTacToeTitle = styled.h4`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #2d3436;
`;

const TicTacToeBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-width: 200px;
  margin: 1rem auto;
`;

const TicTacToeCell = styled.button`
  aspect-ratio: 1;
  background: white;
  border: none;
  border-radius: 8px;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.children === 'X' ? 'hsl(0, 80%, 55%)' : 'hsl(210, 90%, 55%)'};
  cursor: ${props => props.$hasValue ? 'not-allowed' : 'pointer'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const WinnerMessage = styled.div`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: hsl(140, 70%, 45%);
  margin: 0.5rem 0;
`;

const ResetButton = styled.button`
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, hsl(270, 70%, 60%), hsl(210, 90%, 55%));
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }
`;

const HangmanTitle = styled.h4`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #2d3436;
`;

const HangmanWord = styled.div`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.5rem;
  color: #2d3436;
  margin: 0.5rem 0;
`;

const WrongCount = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: hsl(0, 80%, 55%);
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const LetterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  max-width: 280px;
  margin: 1rem auto;
`;

const LetterButton = styled.button`
  aspect-ratio: 1;
  background: ${props => {
    if (props.$correct) return 'hsl(140, 70%, 45%)';
    if (props.$wrong) return 'hsl(0, 80%, 55%)';
    return 'white';
  }};
  color: ${props => (props.$correct || props.$wrong) ? 'white' : '#2d3436'};
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: scale(1.1);
  }
`;

const GameHint = styled.p`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: #636e72;
  font-size: 0.85rem;
  text-align: center;
  padding: 0 1rem;
`;

export default InteractivePlayground;
