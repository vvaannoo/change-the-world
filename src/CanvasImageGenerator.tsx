import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

type Props = {
  width: number;
  height: number;
  name: string;
  backgroundImageUrl: string;
  downloadButtonLabel?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CanvasImageGenerator = ({
  width,
  height,
  name,
  backgroundImageUrl,
  downloadButtonLabel,
  className,
  style,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  console.log(name, backgroundImageUrl);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageUrl;

    backgroundImage.onload = () => {
      console.log("loading image...");
      context.drawImage(backgroundImage, 0, 0, width, height);
      context.fillStyle = "black";
      context.font = "32px Arial";
      context.textAlign = "center";
      context.fillText(name, width / 2, height / 2);

    };
  }, [width, height, name, backgroundImageUrl]);

  const handleDownload = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const imageUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "generated_image.png";
    a.click();
  };

  return (
    <div className={`${className} mb-5`} style={style}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="d-none d-lg-block m-auto rounded shadow mb-4"
      />
      <Button disabled={!name} onClick={handleDownload}>
        {downloadButtonLabel || "Download"}
      </Button>
    </div>
  );
};

export default CanvasImageGenerator;
