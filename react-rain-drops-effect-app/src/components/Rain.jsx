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
        background: #222222;
      `}
    >
      {drops.map((drop, index) => {
        return (
          <div
            key={index}
            className={css`
              background: rgb(174, 226, 238);
              background: linear-gradient(
                180deg,
                rgba(174, 226, 238, 1) 30%,
                rgba(212, 234, 238, 1) 70%
              );
              width: 1px;
              height: 89px;
              position: absolute;
              bottom: 200px;
              top: ${drop.y}px;
              left: ${drop.x}px;
              -webkit-animation: fall 0.63s linear infinite;
              -moz-animation: fall 0.63s linear infinite;
              @-webkit-keyframes fall {
                to {
                  margin-top: 100vh;
                }
              }
              @-moz-keyframes fall {
                to {
                  margin-top: 100vh;
                }
              }

              @keyframes fall {
                to {
                  margin-top: 100vh;
                }
              }
            `}
          ></div>
        );
      })}
    </div>
  );
};

export {Rain};
