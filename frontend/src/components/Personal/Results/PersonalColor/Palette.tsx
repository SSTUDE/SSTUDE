import React, { useEffect, FC, useRef, useState } from "react";
import "./Palette.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface RGB {
  r: number;
  g: number;
  b: number;
}

const Palette: FC = () => {
  const paletteRef = useRef<HTMLUListElement | null>(null);
  const { beautyResults } = useSelector((state: RootState) => {
    console.log("beautyResults 상태값: ", state.personal);
    return state.personal;
  });
  const [selectedSwatch, setSelectedSwatch] = useState<number | null>(null);

  const hexToRgb = (hex: string): RGB | null => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // rgb 값을 hsl 값으로 변환
  const rgb2hsl = (rgbArr: number[]): number[] => {
    var r1 = rgbArr[0] / 255;
    var g1 = rgbArr[1] / 255;
    var b1 = rgbArr[2] / 255;

    var maxColor = Math.max(r1, g1, b1);
    var minColor = Math.min(r1, g1, b1);

    var L = (maxColor + minColor) / 2;
    var S = 0;
    var H = 0;

    if (maxColor !== minColor) {
      if (L < 0.5) {
        S = (maxColor - minColor) / (maxColor + minColor);
      } else {
        S = (maxColor - minColor) / (2.0 - maxColor - minColor);
      }

      if (r1 === maxColor) {
        H = (g1 - b1) / (maxColor - minColor);
      } else if (g1 === maxColor) {
        H = 2.0 + (b1 - r1) / (maxColor - minColor);
      } else {
        H = 4.0 + (r1 - g1) / (maxColor - minColor);
      }
    }

    L = L * 100;
    S = S * 100;
    H = H * 60;
    if (H < 0) {
      H += 360;
    }
    return [H, S, L];
  };

  useEffect(() => {
    if (paletteRef.current !== null) {
      const swatches =
        paletteRef.current.querySelectorAll<HTMLElement>(".swatch");
      swatches.forEach((swatch: HTMLElement, index: number) => {
        if (selectedSwatch !== null && index === selectedSwatch) {
          swatch.classList.add("select");
        } else {
          swatch.classList.remove("select");
        }
      });
    }
  }, [selectedSwatch]);

  useEffect(() => {
    const updateSwatchColors = () => {
      if (paletteRef.current) {
        const swatches =
          paletteRef.current.querySelectorAll<HTMLElement>(".swatch");
        swatches.forEach((swatch: HTMLElement, index: number) => {
          let color = beautyResults?.match_color[index];
          if (color) {
            color = "#" + color; // '#' 추가
            swatch.style.backgroundColor = color;

            const rgb = hexToRgb(color);

            const rgbElement = swatch.querySelector(".rgb");
            const hexElement = swatch.querySelector(".hex");

            if (rgbElement && hexElement) {
              rgbElement.textContent = rgb
                ? `(${rgb.r}, ${rgb.g}, ${rgb.b})`
                : "";
              hexElement.textContent = color; // '#'이 추가된 color
            }
          }
        });
      }
    };

    if (beautyResults?.match_color?.length) {
      if (paletteRef.current && paletteRef.current.children.length) {
        updateSwatchColors();
      } else {
        const checkExist = setInterval(function () {
          if (paletteRef.current && paletteRef.current.children.length) {
            updateSwatchColors();
            clearInterval(checkExist);
          }
        }, 100); // 100ms 마다 .swatch 요소들이 DOM에 추가되었는지 확인
      }
    }
  }, [beautyResults?.match_color, paletteRef.current]);

  return (
    <div className="swatchContainer">
      <ul className="palette" ref={paletteRef}>
        {beautyResults?.match_color
          ? beautyResults.match_color.map((color, index) => (
              <li
                key={index}
                className="swatch"
                data-color={color}
                onClick={() => {
                  if (selectedSwatch === index) {
                    setSelectedSwatch(null); // 이미 선택된 항목을 다시 선택하면 선택 해제
                  } else {
                    setSelectedSwatch(index); // 그 외의 경우에는 선택
                  }
                }}
              >
                <span>{"#" + color}</span>
                <ol>
                  <li>
                    <b>RGB</b>
                    <p className="rgb"></p>
                  </li>
                  <li>
                    <b>HEX</b>
                    <p className="hex"></p>
                  </li>
                </ol>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Palette;
