import {createRoot} from 'react-dom/client';
import {cx, css} from '@emotion/css';
import {useEffect, useState, useRef, useMemo} from 'react';
import {samples, interpolate, formatHex} from 'culori';

import '@fontsource/inter';
import './styles/index.scss';
import {WaterSurface} from './components/WaterSurface';

const App = () => {
  return (
    // <WaterSurface waveHeight={30} />
    <WaterSurface waveHeight={30} rippleSpeed={0.01} frequency={100} />
    // <WaterSurface waveHeight={130} density={0.04} frequency={3}  />
    // <WaterSurface waveHeight={130} density={0.1} frequency={20}  />
    // <WaterSurface waveLength={700} waveHeight={50} />
    // <WaterSurface
    //   waveLength={700}
    //   waveHeight={250}
    //   density={0}
    //   rippleSpeed={0.01}
    //   frequency={1}
    // />
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
