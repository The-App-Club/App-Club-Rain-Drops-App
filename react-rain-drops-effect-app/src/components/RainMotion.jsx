import {css} from '@emotion/css';
import {useRef, useEffect} from 'react';
import {interpolatePath} from 'd3-interpolate-path';
import * as d3 from 'd3';

const paths = {
  step1: `M 154.709 87.444 C 173.686 61.029 250.696 76.882 287.522 111.865 C 314.86 137.834 294.675 174.185 256.166 199.552 C 223.212 221.26 178.616 204.356 159.34 169.923 C 146.292 146.616 139.512 108.597 154.709 87.444 Z`,
  step2: `M 234.866 95.852 C 253.843 69.437 262.467 18.586 299.293 53.569 C 326.631 79.538 303.858 200.568 272.422 234.305 C 242.271 266.663 222.338 193.146 203.062 158.713 C 190.014 135.406 219.669 117.005 234.866 95.852 Z`,
  step3: `M 169.844 91.928 C 188.821 65.513 262.467 18.586 299.293 53.569 C 326.631 79.538 303.858 200.568 272.422 234.305 C 242.271 266.663 237.473 168.482 218.197 134.049 C 205.149 110.742 154.647 113.081 169.844 91.928 Z`,
  step4: `M 169.844 91.928 C 188.821 65.513 222.108 83.048 258.934 118.031 C 286.272 144 303.858 200.568 272.422 234.305 C 242.271 266.663 195.433 237.428 176.157 202.995 C 163.109 179.688 154.647 113.081 169.844 91.928 Z`,
  step5: `M 155.27 103.7 C 154.178 71.193 227.385 49.227 277.992 53.569 C 319.343 57.116 335.248 87.339 303.812 121.076 C 273.661 153.434 253.787 228.631 214.834 234.946 C 178.804 240.787 157.45 168.575 155.27 103.7 Z`,
  step6: `M 155.27 103.7 C 154.178 71.193 227.385 49.227 277.992 53.569 C 319.343 57.116 335.248 87.339 303.812 121.076 C 273.661 153.434 285.177 90.178 246.224 96.493 C 210.194 102.334 157.45 168.575 155.27 103.7 Z`,
  step7: `M 154.709 87.444 C 173.686 61.029 250.696 76.882 287.522 111.865 C 314.86 137.834 294.675 174.185 256.166 199.552 C 223.212 221.26 178.616 204.356 159.34 169.923 C 146.292 146.616 139.512 108.597 154.709 87.444 Z`,
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
      .duration(1000)
      .attrTween('d', function (d) {
        return interpolatePath(pathList[1][0], pathList[1][1]);
      })
      .transition()
      .delay(delay)
      .duration(800)
      .attrTween('d', function (d) {
        return interpolatePath(pathList[2][0], pathList[2][1]);
      })
      .transition()
      .delay(delay)
      .duration(1000)
      .attrTween('d', function (d) {
        return interpolatePath(pathList[3][0], pathList[3][1]);
      })
      .transition()
      .delay(delay)
      .duration(1200)
      .attrTween('d', function (d) {
        return interpolatePath(pathList[4][0], pathList[4][1]);
      })
      .transition()
      .delay(delay)
      .duration(850)
      .attrTween('d', function (d) {
        return interpolatePath(pathList[5][0], pathList[5][1]);
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
      viewBox="0 0 500 500"
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
