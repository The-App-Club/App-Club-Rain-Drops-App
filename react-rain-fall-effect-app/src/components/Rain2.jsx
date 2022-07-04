import {cx, css} from '@emotion/css';
import {samples} from 'culori';
import {useMemo} from 'react';
import * as d3 from 'd3';
import gsap from 'gsap';

import {RainMotion} from './RainMotion';

const Rain = ({numDrops = 30}) => {
  const randomX = useMemo(() => {
    return gsap.utils.random(0, window.innerWidth, 0.01, true);
  }, []);
  const randomY = useMemo(() => {
    return gsap.utils.random(
      -window.innerHeight,
      window.innerHeight,
      0.01,
      true
    );
  }, []);
  const drops = useMemo(() => {
    return samples(numDrops).map((t) => {
      return {
        x: randomX(),
        y: randomY(),
        t,
      };
    });
  }, [numDrops]);

  return (
    <div
      className={css`
        position: relative;
        overflow: hidden;
        height: 100vh;
      `}
    >
      {drops.map((drop, index) => {
        return (
          <div
            key={index}
            className={css`
              position: absolute;
              top: ${drop.y}px;
              left: ${drop.x}px;
              animation: fall 1.5s linear infinite;
              @keyframes fall {
                from {
                  margin-top: 0vh;
                }
                to {
                  margin-top: 100vh;
                }
              }
            `}
          >
            <RainMotion size={100} delay={100} />
          </div>
        );
      })}
    </div>
  );
};

export {Rain};
