import React, { useEffect, useState } from 'react';
import './styles.scss';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
}

const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    generateSnowflakes(); // Tạo các tuyết rơi ban đầu

    const snowfallInterval = setInterval(() => {
      setSnowflakes((prevSnowflakes: Snowflake[] ) => {
        const updatedSnowflakes = prevSnowflakes.map((snowflake) => ({
          ...snowflake,
          y: snowflake.y + snowflake.speed,
          x: snowflake.x + snowflake.speed * Math.sin(snowflake.rotation),
          rotation: snowflake.rotation + snowflake.speed * 0.02,
        }));
        const fallenSnowflakes = updatedSnowflakes.filter((snowflake) => snowflake.y >= window.innerHeight);
        if (fallenSnowflakes.length > 0) {
          const remainingSnowflakes = updatedSnowflakes.filter((snowflake) => snowflake.y < window.innerHeight);
          const newSnowflakes: Snowflake[] = [];
          for (let i = 0; i < fallenSnowflakes.length; i++) {
            newSnowflakes.push(generateSnowflake(fallenSnowflakes[i].id));
          }
          return [...remainingSnowflakes, ...newSnowflakes];
        }
        return updatedSnowflakes;
      });
    }, 20);

    return () => {
      clearInterval(snowfallInterval);
    };
  }, []);

  const generateSnowflake = (id: number): Snowflake => {
    const x = Math.random() * window.innerWidth;
    const y = -Math.random() * window.innerHeight; // Bắt đầu từ trên cùng
    const speed = 1 + Math.random() * 3;
    const rotation = Math.random() * 360; // Góc quay ban đầu
    return { id, x, y, speed, rotation };
  };

  const generateSnowflakes = () => {
    const newSnowflakes: Snowflake[] = [];
    for (let i = 0; i < 200; i++) {
      newSnowflakes.push(generateSnowflake(i));
    }
    setSnowflakes(newSnowflakes);
  };

  return (
    <div className="snowfall">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="snowflake"
          style={{ left: snowflake.x, top: snowflake.y, transform: `rotate(${snowflake.rotation}deg)` }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
