import {css} from '@emotion/css';
import {useRef, useEffect} from 'react';
import {interpolatePath} from 'd3-interpolate-path';
import * as d3 from 'd3';

const paths = {
  step1: `M 55.56 30.039 C 40.347 29.088 33.385 32.661 31.549 45.478 C 29.713 58.295 30.425 62.701 44.446 67.388 C 58.467 72.075 68.69 67.121 71.443 57.362 C 74.555 46.33 70.773 30.99 55.56 30.039 Z`,
  step2: `M 53.164 16.979 C 37.951 16.028 33.385 32.661 31.549 45.478 C 29.713 58.295 39.771 69.89 51.515 70.024 C 63.259 70.158 68.69 67.121 71.443 57.362 C 74.555 46.33 68.377 17.93 53.164 16.979 Z`,
  step3: `M 60.419 45.739 C 60.761 3.099 41.074 3.075 41.015 46.197 C 40.955 90.051 60.004 97.525 60.419 45.739 Z`,
  step4: `M 55.56 30.039 C 40.347 29.088 33.385 32.661 31.549 45.478 C 29.713 58.295 30.425 62.701 44.446 67.388 C 58.467 72.075 68.69 67.121 71.443 57.362 C 74.555 46.33 70.773 30.99 55.56 30.039 Z`,
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
