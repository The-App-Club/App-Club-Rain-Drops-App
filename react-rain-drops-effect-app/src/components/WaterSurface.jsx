import {cx, css} from '@emotion/css';
import {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {samples, interpolate, formatHex} from 'culori';
class Spring {
  constructor() {
    this.p = 0;
    this.v = 0;
  }
  update({density, rippleSpeed}) {
    this.v += -rippleSpeed * this.p - density * this.v;
    this.p += this.v;
  }
}

const WaterSurface = ({
  waveLength = 340, // Wave Length. A numeric value. The higher the number, the smaller the wave length.
  color = '#00aeef', // Water Color
  frequency = 3, // Raindrops frequency. Higher number means more frequent raindrops.
  waveHeight = 100, // Wave height. Higher number means higher waves created by raindrops.
  density = 0.02, // Water density. Higher number means shorter ripples.
  rippleSpeed = 0.1, // Speed of the ripple effect. Higher number means faster ripples.
  waterSurfaceFillHeight = 0.9, // 0 ~ 1
}) => {
  const reqId = useRef(null);
  const canvasDomRef = useRef(null);

  const [tik, setTik] = useState(null);

  const canvasFillColor = useMemo(() => {
    return color;
  }, [tik]);

  const springs = useMemo(() => {
    return samples(waveLength).map((t, index) => {
      return new Spring();
    });
  }, [tik]);

  const updateSprings = ({spread}) => {
    for (let i = 0; i < waveLength; i++) {
      springs[i].update({density, rippleSpeed});
    }

    let leftDeltas = [],
      rightDeltas = [];

    for (let t = 0; t < 8; t++) {
      for (let i = 0; i < waveLength; i++) {
        if (i > 0) {
          leftDeltas[i] = spread * (springs[i].p - springs[i - 1].p);
          springs[i - 1].v += leftDeltas[i];
        }
        if (i < waveLength - 1) {
          rightDeltas[i] = spread * (springs[i].p - springs[i + 1].p);
          springs[i + 1].v += rightDeltas[i];
        }
      }

      for (let i = 0; i < waveLength; i++) {
        if (i > 0) {
          springs[i - 1].p += leftDeltas[i];
        }
        if (i < waveLength - 1) {
          springs[i + 1].p += rightDeltas[i];
        }
      }
    }
  };

  const redraw = ({canvasDomContext}) => {
    if (reqId.current) {
      window.cancelAnimationFrame(reqId.current);
    }
    animate({canvasDomContext});
  };

  const handleResize = () => {
    // https://stackoverflow.com/questions/27759753/update-canvas-dimensions-as-window-is-reshaped
    setTik(new Date());
    const canvasDom = canvasDomRef.current;
    canvasDom.width = window.innerWidth;
    canvasDom.height = window.innerHeight;
    const canvasDomContext = canvasDom.getContext('2d');
    redraw({canvasDomContext});
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderWaves = useCallback(
    ({canvasDomContext}) => {
      canvasDomContext.beginPath();
      canvasDomContext.moveTo(0, window.innerHeight);
      for (let i = 0; i < waveLength; i++) {
        canvasDomContext.lineTo(
          i * (window.innerWidth / waveLength),
          window.innerHeight * waterSurfaceFillHeight + springs[i].p
        );
      }
      canvasDomContext.lineTo(window.innerWidth, window.innerHeight);
      canvasDomContext.fill();
      canvasDomContext.fillStyle = canvasFillColor;
    },
    [tik]
  );

  const animate = ({canvasDomContext}, time) => {
    if (Math.random() * 100 < frequency) {
      springs[Math.floor(Math.random() * waveLength)].p = waveHeight;
    }
    canvasDomContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    updateSprings({spread: 0.1});
    renderWaves({canvasDomContext});

    reqId.current = window.requestAnimationFrame(function (time) {
      return animate({canvasDomContext}, time);
    });
  };

  useEffect(() => {
    const canvasDom = canvasDomRef.current;
    const canvasDomContext = canvasDom.getContext('2d');
    animate({canvasDomContext});
    return () => {
      window.cancelAnimationFrame(reqId.current);
    };
  }, []);

  return (
    <div
      className={css`
        position: relative;
        overflow: hidden;
        height: ${window.innerHeight}px;
      `}
    >
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasDomRef}
        className={css`
          position: absolute;
          bottom: 0;
          left: 0;
        `}
      ></canvas>
    </div>
  );
};

export {WaterSurface};
