import {css} from '@emotion/css';
import {useRef, useEffect} from 'react';
import {interpolatePath} from 'd3-interpolate-path';
import * as d3 from 'd3';

const paths = {
  step1: `M 50.234 20.044 C 45.849 20.09 41.159 33.178 40.362 43.99 C 39.564 54.802 42.659 63.339 47.748 69.015 C 52.837 74.69 59.921 77.505 62.758 73.189 C 65.596 68.874 64.189 57.429 61.444 45.21 C 58.7 32.99 54.62 19.997 50.234 20.044Z`,
  step2: `M 50.234 20.043 C 45.849 20.09 41.159 33.178 37.969 46.452 C 34.78 59.727 33.09 73.19 38.742 79.944 C 44.394 86.699 57.388 86.745 62.618 79.967 C 67.848 73.189 65.314 59.586 62.007 46.288 C 58.7 32.99 54.62 19.997 50.234 20.043Z`,
  step3: `M 50.234 20.044 C 45.849 20.09 41.159 33.178 38.626 45.092 C 36.093 57.007 35.717 67.748 39.633 72.509 C 43.55 77.27 51.759 76.051 56.332 70.633 C 60.905 65.215 61.843 55.6 60.272 44.295 C 58.7 32.99 54.62 19.997 50.234 20.044Z`,
  step4: `M 50.234 20.044 C 45.849 20.09 41.159 33.178 40.362 43.99 C 39.564 54.802 42.659 63.339 47.748 69.015 C 52.837 74.69 59.921 77.505 62.758 73.189 C 65.596 68.874 64.189 57.429 61.444 45.21 C 58.7 32.99 54.62 19.997 50.234 20.044Z`,
};

const RainMotion = ({size, delay}) => {
  const svgDomRef = useRef(null);
  const pathDomRef = useRef(null);

  const niceMorph = ({pathList}) => {
    d3.select(pathDomRef.current)
      .transition()
      .delay(delay)
      .duration(700)
      .attrTween('d', function (d) {
        return interpolatePath(pathList[0][0], pathList[0][1]);
      })
      .transition()
      .delay(delay)
      .duration(300)
      .attrTween('d', function (d) {
        return interpolatePath(pathList[1][0], pathList[1][1]);
      })
      .transition()
      .delay(delay)
      .duration(500)
      .attrTween('d', function (d) {
        return interpolatePath(pathList[2][0], pathList[2][1]);
      })
      .on('end', function () {
        return niceMorph({pathList});
      });
  };

  useEffect(() => {
    const pathList = Object.entries(paths).map((item) => {
      return item[1];
    });
    const pairs = d3.pairs(pathList);
    niceMorph({pathList: pairs});
  }, []);

  return (
    <svg
      ref={svgDomRef}
      width={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={css`
        display: block;
      `}
    >
      <path
        ref={pathDomRef}
        vectorEffect={'non-scaling-stroke'}
        fill={`#b9efef`}
        stroke={`#b9efef`}
        d={paths.step1}
      ></path>
    </svg>
  );
};

export {RainMotion};
