import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import uniqolor from 'uniqolor';

interface AnimatedBackgroundProps {
  duration: number;
  children?: React.ReactNode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
}) => {
  const numColors = 10;
  const colorSequence = Array.from(
    { length: numColors },
    () =>
      uniqolor.random({
        differencePoint: 2,
        lightness: [50, 90], // Adjust lightness range as desired
        format: 'hex',
      }).color + '63'
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateColor = () => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % colorSequence.length;
      });
      // Random delay between 1 and 3 seconds
      const delay = Math.floor(Math.random() * 2000) + 1000;
      intervalId = setTimeout(updateColor, delay);
    };

    updateColor(); // Start the initial animation

    return () => clearTimeout(intervalId); // Cleanup on component unmount
  }, [colorSequence.length]);

  const animatedStyle = useSpring({
    backgroundColor: colorSequence[currentIndex],
    config: { ...config.molasses, duration: 1000 }, // Adjust duration as needed
  });

  const style = {
    ...animatedStyle,
    height: '100%',
    minHeight: '100vh',
  };

  return <animated.div style={style}>{children}</animated.div>;
};
