import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, ShieldCheck, Check, AlertCircle } from 'lucide-react';

export default function Captcha({ onVerify, hasError, resetTrigger }) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isMatch, setIsMatch] = useState(false);
  const canvasRef = useRef(null);

  // Generate a random 5-character alphanumeric string (avoiding confusing chars like 0/O, 1/I)
  const generateCaptchaText = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let text = '';
    for (let i = 0; i < 5; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  };

  // Draw the captcha with security noise lines and distortion onto HTML5 canvas
  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background
    ctx.fillStyle = '#07090E';
    ctx.fillRect(0, 0, width, height);

    // Subtle background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 15) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Interference security lines
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 77, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width, Math.random() * height,
        Math.random() * width, Math.random() * height,
        Math.random() * width, Math.random() * height
      );
      ctx.stroke();
    }

    // Security noise dots
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 77, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Render each character with slight rotation and offset
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.textBaseline = 'middle';

    const colors = ['#FF4D00', '#FFFFFF', '#E2D9C8', '#FF661A', '#CBD5E1'];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      ctx.save();
      const x = 20 + i * 26;
      const y = height / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 20 - 10) * (Math.PI / 180);

      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  };

  const handleRefresh = () => {
    const newText = generateCaptchaText();
    setCaptchaText(newText);
    setUserInput('');
    setIsMatch(false);
    if (onVerify) onVerify(false, '');
    setTimeout(() => drawCaptcha(newText), 20);
  };

  useEffect(() => {
    handleRefresh();
  }, [resetTrigger]);

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase();
    setUserInput(val);

    const matches = val.trim() === captchaText.trim();
    setIsMatch(matches);
    if (onVerify) {
      onVerify(matches, val);
    }
  };

  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400 text-[11px]">
        <span className="flex items-center gap-1.5 font-bold uppercase text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF4D00]" />
          <span>SECURITY VERIFICATION (CAPTCHA) *</span>
        </span>
        <button
          type="button"
          onClick={handleRefresh}
          className="text-slate-400 hover:text-[#FF4D00] flex items-center gap-1 text-[10px] cursor-pointer transition-colors"
          title="Generate a new code"
        >
          <RefreshCw className="w-3 h-3" />
          <span>REFRESH</span>
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Canvas Display */}
        <div className="relative rounded-xl overflow-hidden border border-white/15 bg-[#07090E] shrink-0 select-none">
          <canvas
            ref={canvasRef}
            width={160}
            height={42}
            className="block"
          />
        </div>

        {/* User Input Field */}
        <div className="relative flex-1">
          <input
            type="text"
            required
            maxLength={5}
            placeholder="ENTER CODE"
            value={userInput}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 rounded-xl bg-[#07090E] border text-xs font-mono uppercase tracking-widest text-white focus:outline-none transition-colors ${
              isMatch
                ? 'border-emerald-500 pr-8'
                : hasError
                ? 'border-red-500 pr-8'
                : 'border-white/10 focus:border-[#FF4D00]'
            }`}
          />
          {isMatch && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-400">
              <Check className="w-4 h-4" />
            </div>
          )}
          {!isMatch && hasError && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-red-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {hasError && !isMatch && (
        <p className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>Verification code does not match. Please re-enter the 5 characters above.</span>
        </p>
      )}
    </div>
  );
}
