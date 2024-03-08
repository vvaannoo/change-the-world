import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

type Props = {
  width: number;
  height: number;
  name: string;
  backgroundImageUrl: string;
  downloadButtonLabel?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const pad = (n: number) => (n < 10 ? `0${n}` : n);
const getCurrentDate = () => {
  const date = new Date();
  const d = pad(date.getDate());
  const m = pad(date.getMonth() + 1);
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}

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

  const drawName = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgb(50,50,50)";
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "center";
    ctx.fillText(name, width / 2 + 13, 256);
  }

  const drawDate = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgb(50,50,50)";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(getCurrentDate(), width - 163, height - 80);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageUrl;

    backgroundImage.onload = () => {
      context.drawImage(backgroundImage, 0, 0, width, height);
      drawName(context);
      drawDate(context);
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
