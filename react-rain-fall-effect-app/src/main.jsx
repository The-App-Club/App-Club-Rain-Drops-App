import {createRoot} from 'react-dom/client';
import {cx, css} from '@emotion/css';
import {useEffect, useState, useRef, useMemo} from 'react';
import {samples, interpolate, formatHex} from 'culori';

import '@fontsource/inter';
import './styles/index.scss';
import {Rain} from './components/Rain';

const App = () => {
  return <Rain numDrops={30} />;
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
