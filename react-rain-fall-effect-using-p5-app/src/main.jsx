import {createRoot} from 'react-dom/client';
import {cx, css} from '@emotion/css';
import {useEffect, useState, useRef, useMemo} from 'react';
import '@fontsource/inter';
import './styles/index.scss';

import {Bebop} from './components/Bebop';

const App = () => {
  return <Bebop />;
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
