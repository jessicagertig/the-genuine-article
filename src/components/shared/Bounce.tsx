import React from "react";
import { useSpring, animated } from "@react-spring/web";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BouncingComponent: React.FC = () => {
  const style = useSpring({
    from: { y: 50 },
    to: { y: 70 },
    config: { mass: 1, tension: 10, friction: 0, clamp: true},
    loop: { reverse: true },
  });

  return <animated.div style={{ ...style, width: "70px", height: "70px" }} ><ExpandMoreIcon sx={{ fontSize: "65px", color: "white" }}/></animated.div>;
};

export default BouncingComponent;
