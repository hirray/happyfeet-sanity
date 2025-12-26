import { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Puzzle Quest Game - Memory Card Matching
const PuzzleQuestGame = () => {
  const emojis = ['🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎹', '🎺'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffled);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].emoji)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, cards[first].emoji]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <GameContainer>
      <GameTitle>🧩 Puzzle Quest - Memory Match</GameTitle>
      <GameStats>Moves: {moves} | Matched: {matched.length}/8</GameStats>
      
      <MemoryGrid>
        {cards.map((card, index) => (
          <MemoryCard
            key={card.id}
            onClick={() => handleCardClick(index)}
            $flipped={flipped.includes(index) || matched.includes(card.emoji)}
          >
            {(flipped.includes(index) || matched.includes(card.emoji)) ? card.emoji : '?'}
          </MemoryCard>
        ))}
      </MemoryGrid>
      
      {matched.length === 8 && (
        <WinMessage>🎉 You Won in {moves} moves! 🎉</WinMessage>
      )}
      
      <ResetButton onClick={resetGame}>New Game</ResetButton>
    </GameContainer>
  );
};

// Color Splash Game - Click to Splash Colors
const ColorSplashGame = () => {
  const [color, setColor] = useState('#ff6b6b');
  const [splashes, setSplashes] = useState([]);
  const canvasRef = useRef(null);

  const colors = ['#ff6b6b', '#f9ca24', '#6ab04c', '#4834d4', '#e056fd', '#00d2d3'];

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSplash = {
      id: Date.now() + Math.random(),
      x,
      y,
      color,
      size: Math.random() * 40 + 30
    };
    
    setSplashes(prev => [...prev, newSplash]);
    
    // Draw realistic paint splash
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    
    // Main splash with irregular shape
    const splashSize = newSplash.size;
    const points = 12 + Math.floor(Math.random() * 8); // Random number of points
    
    ctx.beginPath();
    for (let i = 0; i < points; i++) {
      const angle = (Math.PI * 2 * i) / points;
      const randomRadius = splashSize * (0.5 + Math.random() * 0.8); // Irregular radius
      const px = x + Math.cos(angle) * randomRadius;
      const py = y + Math.sin(angle) * randomRadius;
      
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
    
    // Add paint drips and splatters
    const numSplatters = 15 + Math.floor(Math.random() * 15);
    for (let i = 0; i < numSplatters; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = splashSize * (0.8 + Math.random() * 1.2);
      const splatterX = x + Math.cos(angle) * distance;
      const splatterY = y + Math.sin(angle) * distance;
      const splatterSize = Math.random() * 12 + 3;
      
      // Draw irregular splatter
      ctx.beginPath();
      const splatterPoints = 5 + Math.floor(Math.random() * 4);
      for (let j = 0; j < splatterPoints; j++) {
        const sAngle = (Math.PI * 2 * j) / splatterPoints;
        const sRadius = splatterSize * (0.4 + Math.random() * 0.6);
        const spx = splatterX + Math.cos(sAngle) * sRadius;
        const spy = splatterY + Math.sin(sAngle) * sRadius;
        
        if (j === 0) {
          ctx.moveTo(spx, spy);
        } else {
          ctx.lineTo(spx, spy);
        }
      }
      ctx.closePath();
      ctx.fill();
    }
    
    // Add paint drips
    const numDrips = 3 + Math.floor(Math.random() * 5);
    for (let i = 0; i < numDrips; i++) {
      const angle = Math.random() * Math.PI * 2;
      const startDist = splashSize * 0.7;
      const dripX = x + Math.cos(angle) * startDist;
      const dripY = y + Math.sin(angle) * startDist;
      const dripLength = Math.random() * 20 + 10;
      const dripWidth = Math.random() * 4 + 2;
      
      ctx.beginPath();
      ctx.moveTo(dripX - dripWidth/2, dripY);
      ctx.lineTo(dripX + dripWidth/2, dripY);
      ctx.lineTo(dripX + dripWidth/3, dripY + dripLength);
      ctx.lineTo(dripX - dripWidth/3, dripY + dripLength);
      ctx.closePath();
      ctx.fill();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSplashes([]);
  };

  return (
    <GameContainer>
      <GameTitle>🎨 Color Splash - Click to Splash!</GameTitle>
      
      <ColorPalette>
        {colors.map(c => (
          <ColorButton
            key={c}
            $color={c}
            $selected={color === c}
            onClick={() => setColor(c)}
          />
        ))}
      </ColorPalette>
      
      <DrawCanvas
        ref={canvasRef}
        width={350}
        height={220}
        onClick={handleCanvasClick}
      />
      
      <GameStats>Splashes: {splashes.length}</GameStats>
      <ResetButton onClick={clearCanvas}>Clear Canvas</ResetButton>
    </GameContainer>
  );
};

// Space Jump Game - Avoid Obstacles
const SpaceJumpGame = () => {
  const [playerY, setPlayerY] = useState(100);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gravity = setInterval(() => {
      setPlayerY(prev => Math.min(prev + 3, 170));
    }, 30);

    return () => clearInterval(gravity);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const obstacleGenerator = setInterval(() => {
      setObstacles(prev => [...prev, { id: Date.now(), x: 100 }]);
    }, 2000);

    return () => clearInterval(obstacleGenerator);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const obstacleMove = setInterval(() => {
      setObstacles(prev => {
        const updated = prev.map(obs => ({ ...obs, x: obs.x - 2 })).filter(obs => obs.x > -10);
        
        updated.forEach(obs => {
          if (obs.x < 20 && obs.x > 5 && playerY > 130) {
            setGameOver(true);
          }
          if (obs.x < 5 && obs.x > 3) {
            setScore(s => s + 1);
          }
        });
        
        return updated;
      });
    }, 30);

    return () => clearInterval(obstacleMove);
  }, [gameStarted, gameOver, playerY]);

  const jump = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    if (!gameOver) {
      setPlayerY(prev => Math.max(prev - 50, 0));
    }
  };

  const resetGame = () => {
    setPlayerY(100);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  return (
    <GameContainer>
      <GameTitle>🚀 Space Jump - Avoid Obstacles</GameTitle>
      <GameStats>Score: {score}</GameStats>
      
      <GameArea onClick={jump}>
        <Player style={{ top: `${playerY}px` }}>🚀</Player>
        {obstacles.map(obs => (
          <Obstacle key={obs.id} style={{ left: `${obs.x}%` }}>🌑</Obstacle>
        ))}
        
        {!gameStarted && (
          <StartMessage>Click to Start & Jump!</StartMessage>
        )}
        
        {gameOver && (
          <GameOverMessage>
            Game Over! Score: {score}
            <ResetButton onClick={resetGame}>Play Again</ResetButton>
          </GameOverMessage>
        )}
      </GameArea>
    </GameContainer>
  );
};

// Nature Walk Game - Collect Items
const NatureWalkGame = () => {
  const [playerX, setPlayerX] = useState(200);
  const [items, setItems] = useState([]);
  const [collected, setCollected] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const itemGenerator = setInterval(() => {
      setItems(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * 350,
        y: 0,
        emoji: ['🌿', '🍃', '🌸', '🦋'][Math.floor(Math.random() * 4)]
      }]);
    }, 800);

    const itemFall = setInterval(() => {
      setItems(prev => {
        const updated = prev.map(item => ({ ...item, y: item.y + 3 }));
        
        updated.forEach(item => {
          if (Math.abs(item.x - playerX) < 30 && item.y > 250 && item.y < 280) {
            setCollected(c => c + 1);
            setItems(items => items.filter(i => i.id !== item.id));
          }
        });
        
        return updated.filter(item => item.y < 300);
      });
    }, 50);

    return () => {
      clearInterval(timer);
      clearInterval(itemGenerator);
      clearInterval(itemFall);
    };
  }, [gameActive, playerX]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setPlayerX(prev => Math.max(prev - 20, 20));
      } else if (e.key === 'ArrowRight') {
        setPlayerX(prev => Math.min(prev + 20, 380));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const startGame = () => {
    setGameActive(true);
    setCollected(0);
    setTimeLeft(30);
    setItems([]);
  };

  return (
    <GameContainer>
      <GameTitle>🌿 Nature Walk - Collect Items</GameTitle>
      <GameStats>Collected: {collected} | Time: {timeLeft}s</GameStats>
      
      <GameArea>
        {items.map(item => (
          <FallingItem key={item.id} style={{ left: `${item.x}px`, top: `${item.y}px` }}>
            {item.emoji}
          </FallingItem>
        ))}
        
        <NaturePlayer style={{ left: `${playerX}px` }}>🧺</NaturePlayer>
        
        {!gameActive && timeLeft === 30 && (
          <StartMessage>
            Use Arrow Keys to Move!
            <ResetButton onClick={startGame}>Start Game</ResetButton>
          </StartMessage>
        )}
        
        {!gameActive && timeLeft === 0 && (
          <GameOverMessage>
            Time's Up! Collected: {collected}
            <ResetButton onClick={startGame}>Play Again</ResetButton>
          </GameOverMessage>
        )}
      </GameArea>
      
      <GameHint>Use ← → arrow keys to move the basket</GameHint>
    </GameContainer>
  );
};

// Ocean Dive Game - Collect Treasures
const OceanDiveGame = () => {
  const [diverY, setDiverY] = useState(20);
  const [oxygen, setOxygen] = useState(100);
  const [treasures, setTreasures] = useState([]);
  const [collected, setCollected] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (!gameActive) return;

    const oxygenTimer = setInterval(() => {
      setOxygen(prev => {
        if (prev <= 0) {
          setGameActive(false);
          return 0;
        }
        return prev - 0.5;
      });
    }, 100);

    return () => clearInterval(oxygenTimer);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const treasureGenerator = setInterval(() => {
      if (treasures.length < 5) {
        setTreasures(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 70 + 10,
          y: Math.random() * 150 + 50,
          type: ['💎', '🐚', '⭐', '🦀'][Math.floor(Math.random() * 4)]
        }]);
      }
    }, 2000);

    return () => clearInterval(treasureGenerator);
  }, [gameActive, treasures.length]);

  useEffect(() => {
    if (!gameActive) return;

    treasures.forEach(treasure => {
      if (Math.abs(treasure.x - 50) < 15 && Math.abs(treasure.y - diverY) < 15) {
        setCollected(prev => prev + 1);
        setTreasures(prev => prev.filter(t => t.id !== treasure.id));
      }
    });
  }, [diverY, treasures, gameActive]);

  const moveUp = () => {
    if (gameActive) setDiverY(prev => Math.max(prev - 20, 10));
  };

  const moveDown = () => {
    if (gameActive) setDiverY(prev => Math.min(prev + 20, 180));
  };

  const startGame = () => {
    setGameActive(true);
    setDiverY(20);
    setOxygen(100);
    setTreasures([]);
    setCollected(0);
  };

  return (
    <GameContainer>
      <GameTitle>🐠 Ocean Dive - Collect Treasures</GameTitle>
      <GameStats>Oxygen: {Math.round(oxygen)}% | Collected: {collected}</GameStats>
      
      <OceanArea>
        <Diver style={{ top: `${diverY}px`, left: '50%' }}>🤿</Diver>
        
        {treasures.map(treasure => (
          <Treasure key={treasure.id} style={{ left: `${treasure.x}%`, top: `${treasure.y}px` }}>
            {treasure.type}
          </Treasure>
        ))}
        
        {!gameActive && oxygen > 0 && (
          <StartMessage>
            Use buttons to dive!
            <ResetButton onClick={startGame}>Start Diving</ResetButton>
          </StartMessage>
        )}
        
        {oxygen === 0 && (
          <GameOverMessage>
            Out of Oxygen! Collected: {collected}
            <ResetButton onClick={startGame}>Dive Again</ResetButton>
          </GameOverMessage>
        )}
      </OceanArea>
      
      <ButtonGroup>
        <ActionButton onClick={moveUp} disabled={!gameActive}>
          ⬆️ Up
        </ActionButton>
        <ActionButton onClick={moveDown} disabled={!gameActive}>
          ⬇️ Down
        </ActionButton>
      </ButtonGroup>
      
      <GameHint>Move up and down to collect treasures!</GameHint>
    </GameContainer>
  );
};

// Sky Race Game - Collect Stars
const SkyRaceGame = () => {
  const [planeX, setPlaneX] = useState(40);
  const [stars, setStars] = useState([]);
  const [clouds, setClouds] = useState([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (!gameActive) return;

    const starGenerator = setInterval(() => {
      setStars(prev => [...prev, {
        id: Date.now(),
        x: 100,
        y: Math.random() * 130 + 20,
        type: '⭐'
      }]);
    }, 1500);

    const cloudGenerator = setInterval(() => {
      setClouds(prev => [...prev, {
        id: Date.now() + 0.5,
        x: 100,
        y: Math.random() * 130 + 20
      }]);
    }, 2000);

    return () => {
      clearInterval(starGenerator);
      clearInterval(cloudGenerator);
    };
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const moveItems = setInterval(() => {
      setStars(prev => {
        const updated = prev.map(star => ({ ...star, x: star.x - 2 })).filter(star => star.x > -5);
        
        updated.forEach(star => {
          if (Math.abs(star.x - planeX) < 8 && Math.abs(star.y - 90) < 15) {
            setScore(s => s + 1);
            setStars(stars => stars.filter(s => s.id !== star.id));
          }
        });
        
        return updated;
      });

      setClouds(prev => prev.map(cloud => ({ ...cloud, x: cloud.x - 1.5 })).filter(cloud => cloud.x > -5));
    }, 30);

    return () => clearInterval(moveItems);
  }, [gameActive, planeX]);

  const moveLeft = () => {
    if (gameActive) setPlaneX(prev => Math.max(prev - 10, 10));
  };

  const moveRight = () => {
    if (gameActive) setPlaneX(prev => Math.min(prev + 10, 80));
  };

  const startGame = () => {
    setGameActive(true);
    setPlaneX(40);
    setStars([]);
    setClouds([]);
    setScore(0);
  };

  return (
    <GameContainer>
      <GameTitle>✈️ Sky Race - Collect Stars</GameTitle>
      <GameStats>Stars Collected: {score}</GameStats>
      
      <SkyArea>
        <Plane style={{ left: `${planeX}%`, bottom: '90px' }}>✈️</Plane>
        
        {stars.map(star => (
          <CloudDecor key={star.id} style={{ left: `${star.x}%`, top: `${star.y}px` }}>
            {star.type}
          </CloudDecor>
        ))}
        
        {clouds.map(cloud => (
          <CloudDecor key={cloud.id} style={{ left: `${cloud.x}%`, top: `${cloud.y}px`, opacity: 0.6 }}>
            ☁️
          </CloudDecor>
        ))}
        
        {!gameActive && (
          <StartMessage>
            Collect stars while flying!
            <ResetButton onClick={startGame}>Start Flying</ResetButton>
          </StartMessage>
        )}
      </SkyArea>
      
      <ButtonGroup>
        <ActionButton onClick={moveLeft} disabled={!gameActive}>
          ← Left
        </ActionButton>
        <ActionButton onClick={moveRight} disabled={!gameActive}>
          Right →
        </ActionButton>
      </ButtonGroup>
      
      <GameHint>Move left and right to collect stars!</GameHint>
    </GameContainer>
  );
};

// Magic Spell Game - Pattern Memory
const MagicSpellGame = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSpell, setActiveSpell] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const spells = ['🔮', '✨', '🌟', '💫'];

  const startGame = () => {
    const newSequence = [spells[Math.floor(Math.random() * 4)]];
    setSequence(newSequence);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    setTimeout(() => playSequence(newSequence), 500);
  };

  const playSequence = async (seq) => {
    setIsPlaying(true);
    for (let spell of seq) {
      setActiveSpell(spell);
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveSpell(null);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setIsPlaying(false);
  };

  const handleSpellClick = (spell) => {
    if (isPlaying || gameOver) return;

    const newPlayerSeq = [...playerSequence, spell];
    setPlayerSequence(newPlayerSeq);

    // Flash the clicked spell
    setActiveSpell(spell);
    setTimeout(() => setActiveSpell(null), 300);

    if (spell !== sequence[newPlayerSeq.length - 1]) {
      setGameOver(true);
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      setTimeout(() => {
        const newSequence = [...sequence, spells[Math.floor(Math.random() * 4)]];
        setSequence(newSequence);
        setPlayerSequence([]);
        setScore(score + 1);
        playSequence(newSequence);
      }, 500);
    }
  };

  return (
    <GameContainer>
      <GameTitle>🔮 Magic Spell - Memory Pattern</GameTitle>
      <GameStats>Level: {score}</GameStats>
      
      <SpellGrid>
        {spells.map(spell => (
          <SpellButton
            key={spell}
            onClick={() => handleSpellClick(spell)}
            disabled={isPlaying}
            $active={activeSpell === spell}
          >
            {spell}
          </SpellButton>
        ))}
      </SpellGrid>
      
      {isPlaying && <GameStats>Watch the pattern...</GameStats>}
      {!isPlaying && sequence.length > 0 && !gameOver && (
        <GameStats>Your turn! Repeat the pattern</GameStats>
      )}
      
      {gameOver && (
        <GameOverMessage>
          Game Over! Level Reached: {score}
          <ResetButton onClick={startGame}>Try Again</ResetButton>
        </GameOverMessage>
      )}
      
      {!sequence.length && (
        <ResetButton onClick={startGame}>Start Game</ResetButton>
      )}
      
      <GameHint>Watch the pattern, then repeat it!</GameHint>
    </GameContainer>
  );
};

// Candy Land Game - Match 3
const CandyLandGame = () => {
  const candies = ['🍬', '🍭', '🍫', '🍩', '🧁'];
  const [grid, setGrid] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(20);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const newGrid = Array(6).fill(null).map(() =>
      Array(6).fill(null).map(() => candies[Math.floor(Math.random() * candies.length)])
    );
    setGrid(newGrid);
    setScore(0);
    setMoves(20);
    setSelected(null);
  };

  const handleCandyClick = (row, col) => {
    if (moves <= 0) return;

    if (!selected) {
      setSelected({ row, col });
    } else {
      const isAdjacent = 
        (Math.abs(selected.row - row) === 1 && selected.col === col) ||
        (Math.abs(selected.col - col) === 1 && selected.row === row);
      
      if (isAdjacent) {
        swapCandies(selected.row, selected.col, row, col);
        setMoves(prev => prev - 1);
      }
      setSelected(null);
    }
  };

  const swapCandies = (row1, col1, row2, col2) => {
    const newGrid = grid.map(row => [...row]);
    [newGrid[row1][col1], newGrid[row2][col2]] = [newGrid[row2][col2], newGrid[row1][col1]];
    setGrid(newGrid);
    
    // Check for matches
    let matchFound = false;
    
    // Check horizontal matches
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (newGrid[r][c] === newGrid[r][c+1] && newGrid[r][c] === newGrid[r][c+2]) {
          matchFound = true;
          setScore(prev => prev + 30);
        }
      }
    }
    
    // Check vertical matches
    for (let c = 0; c < 6; c++) {
      for (let r = 0; r < 4; r++) {
        if (newGrid[r][c] === newGrid[r+1][c] && newGrid[r][c] === newGrid[r+2][c]) {
          matchFound = true;
          setScore(prev => prev + 30);
        }
      }
    }
    
    if (matchFound) {
      // Shuffle grid slightly for new candies
      setTimeout(() => {
        const refreshedGrid = newGrid.map(row => 
          row.map(candy => Math.random() > 0.3 ? candy : candies[Math.floor(Math.random() * candies.length)])
        );
        setGrid(refreshedGrid);
      }, 300);
    }
  };

  return (
    <GameContainer>
      <GameTitle>🍬 Candy Land - Match 3</GameTitle>
      <GameStats>Score: {score} | Moves: {moves}</GameStats>
      
      <CandyGrid>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', gap: '4px' }}>
            {row.map((candy, colIndex) => (
              <CandyCell
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCandyClick(rowIndex, colIndex)}
                $selected={selected?.row === rowIndex && selected?.col === colIndex}
              >
                {candy}
              </CandyCell>
            ))}
          </div>
        ))}
      </CandyGrid>
      
      {moves === 0 && (
        <WinMessage>Game Over! Final Score: {score}</WinMessage>
      )}
      
      <ResetButton onClick={initializeGrid}>New Game</ResetButton>
      <GameHint>Match 3 candies in a row to score!</GameHint>
    </GameContainer>
  );
};

// Main Modal Component
export const GameModal = ({ game, onClose }) => {
  const renderGame = () => {
    switch (game) {
      case 'Puzzle Quest':
        return <PuzzleQuestGame />;
      case 'Color Splash':
        return <ColorSplashGame />;
      case 'Space Jump':
        return <SpaceJumpGame />;
      case 'Nature Walk':
        return <NatureWalkGame />;
      case 'Ocean Dive':
        return <OceanDiveGame />;
      case 'Sky Race':
        return <SkyRaceGame />;
      case 'Magic Spell':
        return <MagicSpellGame />;
      case 'Candy Land':
        return <CandyLandGame />;
      default:
        return <div>Game not found</div>;
    }
  };

  return (
    <AnimatePresence>
      {game && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>✕</CloseButton>
            {renderGame()}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

// Styled Components
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 420px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: hsl(0, 80%, 55%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: hsl(0, 80%, 45%);
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const GameTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
  text-align: center;
  color: #2d3436;
  margin-bottom: 0.25rem;
`;

const GameStats = styled.div`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: #636e72;
  margin-bottom: 0.25rem;
`;

const MemoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
  margin: 0.75rem 0;
`;

const MemoryCard = styled.button`
  aspect-ratio: 1;
  background: ${props => props.$flipped ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#dfe6e9'};
  border: none;
  border-radius: 6px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ColorPalette = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ColorButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$color};
  border: ${props => props.$selected ? '3px solid #2d3436' : '2px solid white'};
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const BrushSizeControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  
  input {
    width: 100%;
    max-width: 300px;
  }
`;

const DrawCanvas = styled.canvas`
  border: 2px solid #dfe6e9;
  border-radius: 8px;
  cursor: crosshair;
  background: white;
  width: 100%;
  max-width: 350px;
  height: 220px;
  margin: 0 auto;
  display: block;
`;

const GameArea = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: linear-gradient(to bottom, #87CEEB, #E0F6FF);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const Player = styled.div`
  position: absolute;
  left: 50px;
  font-size: 2rem;
  transition: top 0.1s ease;
`;

const Obstacle = styled.div`
  position: absolute;
  bottom: 40px;
  font-size: 1.5rem;
`;

const StartMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const GameOverMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WinMessage = styled.div`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: hsl(140, 70%, 45%);
  padding: 1rem;
  background: rgba(106, 176, 76, 0.1);
  border-radius: 8px;
`;

const ResetButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, hsl(270, 70%, 60%), hsl(210, 90%, 55%));
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin: 0 auto;
  display: block;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }
`;

const FallingItem = styled.div`
  position: absolute;
  font-size: 2rem;
  pointer-events: none;
`;

const NaturePlayer = styled.div`
  position: absolute;
  bottom: 20px;
  font-size: 2.5rem;
  transition: left 0.1s ease;
`;

const OceanArea = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: linear-gradient(to bottom, #4A90E2, #003366);
  border-radius: 10px;
  overflow: hidden;
`;

const Diver = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  transition: top 0.3s ease;
`;

const Treasure = styled.div`
  position: absolute;
  bottom: 20px;
  left: 100px;
  font-size: 2rem;
  animation: ${fadeIn} 0.5s ease;
`;

const WaveEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background: hsl(210, 90%, 55%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: hsl(210, 90%, 45%);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SkyArea = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background: linear-gradient(to bottom, #87CEEB, #B0E0E6);
  border-radius: 10px;
  overflow: hidden;
`;

const Plane = styled.div`
  position: absolute;
  bottom: 50px;
  font-size: 3rem;
  transition: left 0.2s ease;
`;

const CloudDecor = styled.div`
  position: absolute;
  top: 30px;
  font-size: 2rem;
  opacity: 0.7;
`;

const SpellGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0;
`;

const SpellButton = styled.button`
  aspect-ratio: 1;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #ffd700, #ffed4e)' 
    : 'linear-gradient(135deg, #667eea, #764ba2)'};
  border: none;
  border-radius: 10px;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active 
    ? '0 6px 20px rgba(255, 215, 0, 0.6)' 
    : '0 4px 12px rgba(0, 0, 0, 0.2)'};
  transform: ${props => props.$active ? 'scale(1.1)' : 'scale(1)'};
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CandyGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 1rem 0;
`;

const CandyCell = styled.button`
  width: 42px;
  height: 42px;
  background: ${props => props.$selected ? '#ffeaa7' : 'white'};
  border: 2px solid ${props => props.$selected ? '#fdcb6e' : '#dfe6e9'};
  border-radius: 6px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const GameHint = styled.p`
  text-align: center;
  color: #636e72;
  font-size: 0.9rem;
  font-style: italic;
  margin-top: 0.5rem;
`;

export default GameModal;
