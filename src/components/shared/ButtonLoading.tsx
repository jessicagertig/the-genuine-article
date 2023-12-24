import React from "react";
import { useTrail, animated, SpringValue } from "@react-spring/web";

const LoadingAnimation: React.FC = () => {
  const [restart, setRestart] = React.useState(false);

  const trail = useTrail(3, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
    reset: restart,
    // delay: (i: number) => i * 500, // Delay each dot's animation by an increasing amount
  });

  React.useEffect(() => {
    if (trail[2].opacity.get() === 1) {
      setRestart(!restart);
    }
  }, [trail]);

  return (
    <div>
      {trail.map((style: { opacity: SpringValue<number> }, index: number) => (
        <animated.div
          key={index}
          style={{ ...style, paddingRight: "2px", fontSize: "1rem" }}
        >
          .
        </animated.div>
      ))}
    </div>
  );
};

export default LoadingAnimation;
