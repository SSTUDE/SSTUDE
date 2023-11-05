import React, { useEffect, FC, useState } from "react";
import "./Palette.css";

const swatches: string[] = [
  "#4cadeb",
  "#7ac2f0",
  "#a8d7f5",
  "#eb8a4c",
  "#f0a87a",
  "#f5c6a8",
  "#9b9b9b",
  "#b5b5b5",
  "#4cadeb",
  "#7ac2f0",
  "#eb8a4c",
  "#f5c6a8",
  "#7ac2f0",
];

interface RGB {
  r: number;
  g: number;
  b: number;
}

const Palette: FC = () => {
  const [selectedColor, setSelectedColor] = useState(null);

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
    document.querySelectorAll(".swatch").forEach((element, index) => {
      const hex = (element as HTMLElement).dataset.color || "";
      (element as HTMLElement).style.backgroundColor = hex;

      element.addEventListener("click", () => {
        if (element.classList.contains("select")) {
          element.classList.remove("select");
          element.classList.add("unselect");
        } else {
          document.querySelectorAll(".swatch").forEach((swatch) => {
            swatch.classList.remove("select");
            swatch.classList.add("unselect");
          });
          element.classList.remove("unselect");
          element.classList.add("select");
        }
      });

      element.innerHTML += `<span>${hex}</span>`;

      const rgb = hexToRgb(hex);
      if (rgb) {
        const rgbText = `${Math.ceil(rgb.r)}, ${Math.ceil(rgb.g)}, ${Math.ceil(
          rgb.b
        )}`;
        const hsl = rgb2hsl([222, 63, 126]);
        const hslText = `${Math.ceil(hsl[0])}, ${Math.ceil(
          hsl[1]
        )}, ${Math.ceil(hsl[2])}`;

        const rgbElement = element.querySelector("ol li:nth-child(1) i");
        const hslElement = element.querySelector("ol li:nth-child(2) i");
        const hexElement = element.querySelector("ol li:nth-child(3) i");

        if (rgbElement) rgbElement.textContent = rgbText;
        if (hslElement) hslElement.textContent = hslText;
        if (hexElement) hexElement.textContent = hex;
      }
    });
  }, []);

  return (
    <div className="swatchContainer">
      <ul className="palette">
        {swatches.map((color, index) => (
          <li key={index} className="swatch" data-color={color}>
            <ol>
              <li>
                <b>RGB</b>
                <i></i>
              </li>
              <li>
                <b>HSL</b>
                <i></i>
              </li>
              <li>
                <b>HEX</b>
                <i></i>
              </li>
            </ol>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Palette;
