import React from "react";

interface SplitTextProps {
  text: string;
  className?: string;
}

/**
 * Renderiza o texto com animação palavra a palavra e suporte a *itálico*.
 * Palavras entre *asteriscos* viram <em>...</em>.
 */
export function SplitText({ text, className = "" }: SplitTextProps) {
  const words = text.trim().split(/\s+/);
  let inItalic = false;

  return (
    <span className={`split ${className}`}>
      {words.map((word, i) => {
        const starCount = (word.match(/\*/g) || []).length;
        const cleanWord = word.replace(/\*/g, "");
        const shouldBeItalic = inItalic || starCount > 0;

        if (starCount % 2 !== 0) {
          inItalic = !inItalic;
        }

        return (
          <React.Fragment key={i}>
            <span className="w">
              <span style={{ "--i": i } as React.CSSProperties}>
                {shouldBeItalic ? <em>{cleanWord}</em> : cleanWord}
              </span>
            </span>{" "}
          </React.Fragment>
        );
      })}
    </span>
  );
}
