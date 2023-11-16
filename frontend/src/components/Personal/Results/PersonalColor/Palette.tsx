import "./Palette.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import React, { useEffect, FC, useRef, useState } from "react";

interface RGB {
  r: number;
  g: number;
  b: number;
}

const Palette: FC = () => {
  const paletteRef = useRef<HTMLUListElement | null>(null);
  const { beautyResults } = useSelector((state: RootState) => {
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
            color = "#" + color; 
            swatch.style.backgroundColor = color;

            const rgb = hexToRgb(color);

            const rgbElement = swatch.querySelector(".rgb");
            const hexElement = swatch.querySelector(".hex");

            if (rgbElement && hexElement) {
              rgbElement.textContent = rgb
                ? `(${rgb.r}, ${rgb.g}, ${rgb.b})`
                : "";
              hexElement.textContent = color;
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
        }, 100); 
      }
    }
  }, [beautyResults?.match_color, paletteRef.current]);

  // 팔레트 애니메이션
  useEffect(() => {
    if (paletteRef.current) {
      const swatches =
        paletteRef.current.querySelectorAll<HTMLElement>(".swatch");
      swatches.forEach((swatch: HTMLElement, index: number) => {
        setTimeout(() => {
          swatch.classList.add("animate");
        }, index * 100);
      });
    }
  }, []);

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
                  setSelectedSwatch(null); 
                } else {
                  setSelectedSwatch(index); 
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
