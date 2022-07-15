import {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {css} from '@emotion/css';
import p5 from 'p5';
import {MathUtils} from 'three';

import raingirl from '../assets/raingirl.jpg';

const Bebop = () => {
  const [tik, setTik] = useState(new Date());
  const p5sketchDomRef = useRef(null);
  const myp5Ref = useRef(null);
  const handleResize = useCallback((e) => {
    // https://stackoverflow.com/a/67134818/15972569
    setTik(new Date());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const p5sketchDom = p5sketchDomRef.current;
    const mycode = (p = new p5()) => {
      class Raindrop {
        constructor(x, y, vy) {
          this.firstRender = false;
          this.t = 0;
          this.x = x;
          this.y = y;
          this.vy = vy;
          this.fallHeight = window.innerHeight + 100; // 消えるようにするために、補正
          this.dropWidth = {min: 1, max: 5};
          this.morphedWidth = this.dropWidth.max;
        }
        morphShape() {
          this.morphedWidth = p.lerp(
            this.dropWidth.max,
            this.dropWidth.min,
            this.t
          );
        }
        setProgress() {
          this.t = MathUtils.inverseLerp(0, this.fallHeight - 1, this.y);
        }
        fire() {
          if (this.firstRender) {
            const dropColor = p.color('#D6EFED');
            p.fill(dropColor);
            p.stroke(dropColor);
            p.ellipse(this.x, this.y, this.morphedWidth, 20);
          }
          this.y +=
            this.vy * 3 * ((this.fallHeight - this.y) / this.fallHeight);
          if (this.y > this.fallHeight - 1) {
            this.y = 0;
            this.firstRender = true;
          }
        }
      }
      let bg;
      const raindrops = [...Array(301).keys()].map((n) => {
        const startX = p.random(0, window.innerWidth);
        const startY = p.random(-window.innerHeight, 0);
        const startVy = p.random(10, 70);
        return new Raindrop(startX, startY, startVy);
      });
      p.setup = () => {
        bg = p.loadImage(raingirl);
        p.createCanvas(window.innerWidth, window.innerHeight);
      };
      p.draw = () => {
        // p.background('#222');
        p.background(bg);
        raindrops.forEach((raindrop) => {
          raindrop.fire();
          raindrop.setProgress();
          raindrop.morphShape();
        });
      };
    };
    p5sketchDomRef.current.querySelector('canvas')?.remove();
    myp5Ref.current = new p5((instance) => {
      mycode(instance);
    }, p5sketchDom);
    return () => {};
  }, [tik]);

  return (
    <div
      className={css`
        width: 100%;
      `}
    >
      <div
        ref={p5sketchDomRef}
        className={css`
          width: 100%;
          display: block;
          margin: auto;
          height: auto;
          & > canvas {
            width: 100vw;
            height: auto;
          }
        `}
      ></div>
    </div>
  );
};

export {Bebop};
