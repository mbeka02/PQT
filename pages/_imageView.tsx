import React from "react";

interface ImageModalProps {
  content?: {
    text?: string;
    imageSrc?: string;
  };
  gameScore: string; // New prop for the game score
  onClose: () => void;
}

export default function ImageView({
  content,
  gameScore,
  onClose,
}: ImageModalProps) {
  const imageText = content?.text ?? "No text available";
  const imageSrc = content?.imageSrc;

  return (
    <div>
      <div onClick={(e) => e.stopPropagation()} className="grid gap-12">
        <div className="grid gap-1 mt-6">
          <h1 className="font-semibold text-2xl ">Game Log: {gameScore}</h1>
          <p>{imageText}</p>
        </div>
        {imageSrc && (
          <img src={imageSrc} alt="Game Log" className="rounded-sm" />
        )}{" "}
        {/* Render the image only if imageSrc is available */}
        <button
          onClick={onClose}
          className="absolute right-4 top-1 h-4 w-4 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="hover:fill-red-500"
          >
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
