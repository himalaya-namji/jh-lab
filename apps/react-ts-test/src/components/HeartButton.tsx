import { useState } from 'react';
import { motion } from 'framer-motion';

const HeartButton = () => {
  const [liked, setLiked] = useState(false);
  const [pop, setPop] = useState(false);

  const handleClick = () => {
    setLiked((prev) => !prev);
    setPop(true);
  };

  return (
    <motion.button
      onClick={handleClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animate={pop ? { scale: [1, 1.4, 1] } : { scale: 1 }}
      transition={{ duration: 0.3, times: [0, 0.5, 1] }}
      onAnimationComplete={() => setPop(false)}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20 35s-9.14-7.36-12.73-11.13C3.13 20.13 2 17.36 2 14.5 2 9.26 6.26 5 11.5 5c2.74 0 5.41 1.23 7.13 3.36C20.09 6.23 22.76 5 25.5 5 30.74 5 35 9.26 35 14.5c0 2.86-1.13 5.63-5.27 9.37C29.14 27.64 20 35 20 35z"
          fill={liked ? '#e25555' : '#ccc'}
          stroke="#e25555"
          strokeWidth="2"
          initial={false}
          animate={{
            scale: pop ? [1, 1.2, 1] : 1,
            fill: liked ? '#e25555' : '#ccc',
          }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </motion.button>
  );
};

export default HeartButton; 