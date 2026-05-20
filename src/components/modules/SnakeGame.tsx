import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import style from "../../styles/modules/SnakeGame.module.css";
import Key from "../UI/Key.tsx";
import Food from "../UI/Food.tsx";
import {useNavigate} from "react-router-dom";

type Position = {
    x: number;
    y: number;
};

const GRID_SIZE = 12;

const INITIAL_SNAKE: Position[] = [
    { x: 5, y: 5 },
];

const generateFood = (snake: Position[]): Position => {
    while (true) {
        const position = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };

        const isSnake = snake.some(
            segment => segment.x === position.x && segment.y === position.y
        );

        if (!isSnake) {
            return position;
        }
    }
};

const SnakeGame: React.FC = () => {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
    const [food, setFood] = useState<Position>(() => generateFood(INITIAL_SNAKE));
    const [collectedFoods, setCollectedFoods] = useState<boolean[]>(
        Array(10).fill(false)
    );

    const [started, setStarted] = useState(false);
    const [paused, setPaused] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const directionRef = useRef(direction);
    const navigate = useNavigate();

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    function resetGame(): void {
        setSnake(INITIAL_SNAKE);
        setDirection({ x: 1, y: 0 });
        setFood(generateFood(INITIAL_SNAKE));
        setCollectedFoods(Array(10).fill(false));
        setGameOver(false);
        setPaused(false);
    };

    const startGame = () => {
        resetGame();
        setStarted(true);
    };

    function getHeadClass(): string {
        if (direction.x === 1) return style.snakeHeadRight;
        if (direction.x === -1) return style.snakeHeadLeft;
        if (direction.y === -1) return style.snakeHeadUp;

        return style.snakeHeadDown;
    };

    const onAllFoodCollected = useCallback(() => {
        navigate("/about")
    }, []);



    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent): void {
            if (e.code === "Space") {
                if (started && !gameOver) {
                    setPaused(prev => !prev);
                }

                return;
            }

            if (!started || paused || gameOver) {
                return;
            }

            if (e.key === "ArrowUp" && directionRef.current.y !== 1) {
                setDirection({ x: 0, y: -1 });
            }

            if (e.key === "ArrowDown" && directionRef.current.y !== -1) {
                setDirection({ x: 0, y: 1 });
            }

            if (e.key === "ArrowLeft" && directionRef.current.x !== 1) {
                setDirection({ x: -1, y: 0 });
            }

            if (e.key === "ArrowRight" && directionRef.current.x !== -1) {
                setDirection({ x: 1, y: 0 });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [started, paused, gameOver]);

    useEffect(() => {
        if (!started || paused || gameOver) {
            return;
        }

        const interval = setInterval(() => {
            setSnake(prev => {
                const head = prev[0];

                const newHead = {
                    x: head.x + directionRef.current.x,
                    y: head.y + directionRef.current.y,
                };

                if (
                    newHead.x < 0 ||
                    newHead.y < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y >= GRID_SIZE
                ) {
                    setGameOver(true);
                    return prev;
                }

                const hitSnake = prev.some(
                    segment =>
                        segment.x === newHead.x &&
                        segment.y === newHead.y
                );

                if (hitSnake) {
                    setGameOver(true);
                    return prev;
                }

                const isFood =
                    newHead.x === food.x &&
                    newHead.y === food.y;

                if (isFood) {
                    const updatedFoods = [...collectedFoods];

                    const nextIndex = updatedFoods.findIndex(v => !v);

                    if (nextIndex !== -1) {
                        updatedFoods[nextIndex] = true;
                        setCollectedFoods(updatedFoods);

                        const completed = updatedFoods.every(Boolean);

                        if (completed) {
                            onAllFoodCollected();
                        }
                    }

                    const newSnake = [newHead, ...prev];

                    setFood(generateFood(newSnake));

                    return newSnake;
                }

                return [newHead, ...prev.slice(0, -1)];
            });
        }, 140);

        return () => clearInterval(interval);
    }, [started, paused, gameOver, food, collectedFoods, onAllFoodCollected]);

    const cells = useMemo(() => {
        const result = [];

        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const snakeIndex = snake.findIndex(
                    segment => segment.x === x && segment.y === y
                );

                const isSnake = snakeIndex !== -1;

                const isHead = snakeIndex === 0;

                const isFood =
                    food.x === x &&
                    food.y === y;

                result.push(
                    <div
                        key={`${x}-${y}`}
                        className={`
                        ${style.cell}
                        ${isSnake ? style.snake : ""}
                        ${isFood ? style.food : ""}
                        ${isHead ? getHeadClass() : ""}
                    `}
                    />
                );
            }
        }

        return result;
    }, [snake, food, direction]);

    return (
        <div className={style.container}>
            <div className={style.game}>
                <div className={style.gameWrapper}>
                    <div className={style.gameArea}>
                        {cells}

                        {!started && (
                            <div className={style.overlay}>
                                <button
                                    className={style.playButton}
                                    onClick={startGame}
                                >
                                    Играть
                                </button>
                            </div>
                        )}

                        {paused && (
                            <div className={style.overlay}>
                                <span className={style.overlayText}>
                                    Пауза
                                </span>
                            </div>
                        )}

                        {gameOver && (
                            <div className={style.overlay}>
                                <button
                                    className={style.playButton}
                                    onClick={startGame}
                                >
                                    Играть снова
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className={style.InstructionsMainContainer}>
                    <div className={style.InstructionsTopContainer}>
                        <div>
                            <div className={style.instructions}>
                                <div className={style.comments}>
                                    <span>// стрелки — движение</span>
                                    <span>// пробел — пауза</span>
                                </div>

                                <div className={style.keysMainContainer}>
                                    <div className={style.keysContainer}>
                                        <Key
                                            onClick={() => {
                                                if (directionRef.current.y !== 1 && started && !paused){
                                                    setDirection({ x: 0, y: -1 })
                                                }
                                            }}
                                            value={"▲"}
                                            width={"43px"}
                                        />
                                    </div>

                                    <div className={style.keysContainer}>
                                        <Key
                                            onClick={() => {
                                                if (directionRef.current.x !== 1 && started && !paused){
                                                    setDirection({ x: -1, y: 0 })
                                                }
                                            }}
                                            value={"◀"}
                                            width={"43px"}
                                        />

                                        <Key
                                            onClick={() => {
                                                if (directionRef.current.y !== -1 && started && !paused){
                                                    setDirection({ x: 0, y: 1 })
                                                }
                                            }}
                                            value={"▼"}
                                            width={"43px"}
                                        />

                                        <Key
                                            onClick={() => {
                                                if (directionRef.current.x !== -1 && started && !paused){
                                                    setDirection({ x: 1, y: 0 })
                                                }
                                            }}
                                            value={"▶"}
                                            width={"43px"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span>// еды осталось</span>

                            <div className={style.FoodsContainer}>
                                {collectedFoods.map((food, idx) => (
                                    <Food
                                        key={idx}
                                        active={food}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={style.InstructionsBottomContainer}>
                        <button
                            style={{width: "100%"}}
                            className={style.playButton}
                            onClick={() => navigate("/about")}
                        >Пропустить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;