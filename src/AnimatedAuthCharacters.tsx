import { useEffect, useRef, useState } from "react";

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
  forceLookWeight?: number;
  mouseX?: number;
  mouseY?: number;
}

export const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY,
  forceLookWeight = 1,
  mouseX = 0,
  mouseY = 0
}: PupilProps) => {
  const pupilRef = useRef<HTMLDivElement>(null);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;
    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
    const angle = Math.atan2(deltaY, deltaX);

    const naturalPosition = {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };

    if (forceLookX === undefined || forceLookY === undefined) {
      return naturalPosition;
    }

    const weight = Math.max(0, Math.min(1, forceLookWeight));
    return {
      x: naturalPosition.x + (forceLookX - naturalPosition.x) * weight,
      y: naturalPosition.y + (forceLookY - naturalPosition.y) * weight
    };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: "transform 0.1s ease-out"
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
  forceLookWeight?: number;
  mouseX?: number;
  mouseY?: number;
}

export const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
  forceLookWeight = 1,
  mouseX = 0,
  mouseY = 0
}: EyeBallProps) => {
  const eyeRef = useRef<HTMLDivElement>(null);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
    const angle = Math.atan2(deltaY, deltaX);

    const naturalPosition = {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };

    if (forceLookX === undefined || forceLookY === undefined) {
      return naturalPosition;
    }

    const weight = Math.max(0, Math.min(1, forceLookWeight));
    return {
      x: naturalPosition.x + (forceLookX - naturalPosition.x) * weight,
      y: naturalPosition.y + (forceLookY - naturalPosition.y) * weight
    };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: eyeColor,
        overflow: "hidden",
        transform: `scaleY(${isBlinking ? 0 : 1})`,
        transformOrigin: "center",
        transition: "transform 150ms ease-in-out"
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: `${pupilSize}px`,
          height: `${pupilSize}px`,
          backgroundColor: pupilColor,
          transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
          transition: "transform 0.1s ease-out"
        }}
      />
    </div>
  );
};

interface AnimatedAuthCharactersProps {
  isTyping?: boolean;
  showPassword?: boolean;
  passwordLength?: number;
}

function useAnimatedProgress(target: number, duration = 700) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useEffect(() => {
    const startValue = valueRef.current;
    const startedAt = performance.now();
    let animationFrame: number;

    const animate = (now: number) => {
      const elapsed = Math.min(1, (now - startedAt) / duration);
      const eased = elapsed < 0.5 ? 4 * elapsed ** 3 : 1 - (-2 * elapsed + 2) ** 3 / 2;
      const nextValue = startValue + (target - startValue) * eased;
      valueRef.current = nextValue;
      setValue(nextValue);

      if (elapsed < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [duration, target]);

  return value;
}

export function AnimatedAuthCharacters({
  isTyping = false,
  showPassword = false,
  passwordLength = 0
}: AnimatedAuthCharactersProps) {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isInputTransitioning, setIsInputTransitioning] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const mouseAnimationFrame = useRef<number | undefined>(undefined);
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const initialMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouseCurrent.current = initialMouse;
    mouseTarget.current = initialMouse;
    setMouseX(initialMouse.x);
    setMouseY(initialMouse.y);

    const animateMouse = () => {
      const current = mouseCurrent.current;
      const target = mouseTarget.current;
      const nextX = current.x + (target.x - current.x) * 0.22;
      const nextY = current.y + (target.y - current.y) * 0.22;
      const hasSettled = Math.abs(target.x - nextX) < 0.1 && Math.abs(target.y - nextY) < 0.1;

      mouseCurrent.current = hasSettled ? target : { x: nextX, y: nextY };
      setMouseX(mouseCurrent.current.x);
      setMouseY(mouseCurrent.current.y);

      if (hasSettled) {
        mouseAnimationFrame.current = undefined;
        return;
      }

      mouseAnimationFrame.current = window.requestAnimationFrame(animateMouse);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseTarget.current = { x: event.clientX, y: event.clientY };
      if (mouseAnimationFrame.current === undefined) {
        mouseAnimationFrame.current = window.requestAnimationFrame(animateMouse);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseAnimationFrame.current !== undefined) {
        window.cancelAnimationFrame(mouseAnimationFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = window.setTimeout(() => {
        setIsPurpleBlinking(true);
        window.setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = window.setTimeout(() => {
        setIsBlackBlinking(true);
        window.setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = window.setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => window.clearTimeout(timer);
    }

    setIsLookingAtEachOther(false);
  }, [isTyping]);

  useEffect(() => {
    setIsInputTransitioning(true);
    const timer = window.setTimeout(() => setIsInputTransitioning(false), 1600);
    return () => window.clearTimeout(timer);
  }, [isTyping, showPassword, passwordLength > 0]);

  useEffect(() => {
    if (passwordLength > 0 && showPassword) {
      const schedulePeek = () => {
        const peekInterval = window.setTimeout(() => {
          setIsPurplePeeking(true);
          window.setTimeout(() => setIsPurplePeeking(false), 800);
        }, Math.random() * 3000 + 2000);
        return peekInterval;
      };

      const firstPeek = schedulePeek();
      return () => window.clearTimeout(firstPeek);
    }

    setIsPurplePeeking(false);
  }, [passwordLength, showPassword, isPurplePeeking]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);
  const isHidingPassword = passwordLength > 0 && !showPassword;
  const purpleInteractionProgress = useAnimatedProgress(isTyping || isHidingPassword ? 1 : 0);
  const purplePasswordProgress = useAnimatedProgress(passwordLength > 0 && showPassword ? 1 : 0);
  const characterGlanceProgress = useAnimatedProgress(isLookingAtEachOther ? 1 : 0, 550);
  const purpleMouseSkew = purplePos.bodySkew * (1 - purplePasswordProgress);
  const purpleInteractionAmount = purpleInteractionProgress * (1 - purplePasswordProgress);
  const blackSkew =
    (blackPos.bodySkew * (1 + 0.5 * purpleInteractionAmount) + 10 * characterGlanceProgress) *
    (1 - purplePasswordProgress);
  const blackTranslateX = 20 * characterGlanceProgress * (1 - purplePasswordProgress);
  const blackGlanceFaceX = blackPos.faceX + (6 - blackPos.faceX) * characterGlanceProgress;
  const blackGlanceFaceY = blackPos.faceY + (-20 - blackPos.faceY) * characterGlanceProgress;
  const blackFaceX = blackGlanceFaceX + (-16 - blackGlanceFaceX) * purplePasswordProgress;
  const blackFaceY = blackGlanceFaceY + (-4 - blackGlanceFaceY) * purplePasswordProgress;
  const blackForcedLookWeight = Math.max(characterGlanceProgress, purplePasswordProgress);
  const blackForcedLookX = -4 * purplePasswordProgress;
  const orangeSkew = orangePos.bodySkew * (1 - purplePasswordProgress);
  const orangeFaceX = orangePos.faceX + (-32 - orangePos.faceX) * purplePasswordProgress;
  const orangeFaceY = orangePos.faceY + (-5 - orangePos.faceY) * purplePasswordProgress;
  const yellowSkew = yellowPos.bodySkew * (1 - purplePasswordProgress);
  const yellowFaceX = yellowPos.faceX + (-32 - yellowPos.faceX) * purplePasswordProgress;
  const yellowFaceY = yellowPos.faceY + (-5 - yellowPos.faceY) * purplePasswordProgress;
  const yellowMouthX = yellowPos.faceX + (-30 - yellowPos.faceX) * purplePasswordProgress;
  const yellowMouthY = yellowPos.faceY * (1 - purplePasswordProgress);
  const purpleHeight = 400 + 40 * purpleInteractionAmount;
  const purpleTranslateX = 40 * purpleInteractionAmount;
  const purpleSkew = purpleMouseSkew - 12 * purpleInteractionAmount;
  const purpleTopY = 400 - purpleHeight;
  const purpleTopShift = -purpleHeight * Math.tan((purpleSkew * Math.PI) / 180);
  const purpleBottomLeft = 70 + purpleTranslateX;
  const purpleBottomRight = purpleBottomLeft + 180;
  const purpleTopLeft = purpleBottomLeft + purpleTopShift;
  const purpleTopRight = purpleBottomRight + purpleTopShift;
  const purpleEyeOffsetX =
    passwordLength > 0 && showPassword
      ? -25
      : purplePos.faceX + (10 - purplePos.faceX) * characterGlanceProgress;
  const purpleEyeOffsetY =
    passwordLength > 0 && showPassword
      ? -5
      : purplePos.faceY + (25 - purplePos.faceY) * characterGlanceProgress;
  const purpleEyeTop = purpleTopY + 40 + purpleEyeOffsetY;
  const purpleEyeLeft =
    purpleBottomLeft +
    45 +
    purpleEyeOffsetX +
    Math.tan((purpleSkew * Math.PI) / 180) * (purpleEyeTop - 400);

  return (
    <div
      className={`auth-source-characters relative${isInputTransitioning ? " is-input-transitioning" : ""}`}
      style={{ width: "550px", height: "400px" }}
    >
      <div
        ref={purpleRef}
        className="absolute bottom-0"
        style={{
          left: "70px",
          width: "180px",
          height: "440px",
          pointerEvents: "none"
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute bottom-0"
        height="400"
        style={{ left: 0, overflow: "visible", pointerEvents: "none", zIndex: 1 }}
        viewBox="0 0 550 400"
        width="550"
      >
        <path
          d={`M ${purpleBottomLeft} 400 L ${purpleBottomRight} 400 L ${purpleTopRight} ${purpleTopY + 10} Q ${purpleTopRight} ${purpleTopY} ${purpleTopRight - 10} ${purpleTopY} L ${purpleTopLeft + 10} ${purpleTopY} Q ${purpleTopLeft} ${purpleTopY} ${purpleTopLeft} ${purpleTopY + 10} Z`}
          fill="#6C3FF5"
        />
      </svg>
      <div
        className="absolute flex gap-8"
        style={{
          left: 0,
          top: 0,
          transform: `translate(${purpleEyeLeft}px, ${purpleEyeTop}px)`,
          zIndex: 1
        }}
      >
        <EyeBall
          size={18}
          pupilSize={7}
          maxDistance={5}
          eyeColor="white"
          pupilColor="#2D2D2D"
          isBlinking={isPurpleBlinking}
          mouseX={mouseX}
          mouseY={mouseY}
          forceLookX={passwordLength > 0 && showPassword ? (isPurplePeeking ? 4 : -4) : 3}
          forceLookY={passwordLength > 0 && showPassword ? (isPurplePeeking ? 5 : -4) : 4}
          forceLookWeight={passwordLength > 0 && showPassword ? 1 : characterGlanceProgress}
        />
        <EyeBall
          size={18}
          pupilSize={7}
          maxDistance={5}
          eyeColor="white"
          pupilColor="#2D2D2D"
          isBlinking={isPurpleBlinking}
          mouseX={mouseX}
          mouseY={mouseY}
          forceLookX={passwordLength > 0 && showPassword ? (isPurplePeeking ? 4 : -4) : 3}
          forceLookY={passwordLength > 0 && showPassword ? (isPurplePeeking ? 5 : -4) : 4}
          forceLookWeight={passwordLength > 0 && showPassword ? 1 : characterGlanceProgress}
        />
      </div>

      <div
        ref={blackRef}
        className="absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "240px",
          width: "120px",
          height: "310px",
          backgroundColor: "#2D2D2D",
          borderRadius: "8px 8px 0 0",
          zIndex: 2,
          transform: `skewX(${blackSkew}deg) translateX(${blackTranslateX}px)`,
          transformOrigin: "bottom center",
          transitionDuration: "700ms, 0ms",
          transitionProperty: "height, transform",
          transitionTimingFunction: "ease-in-out, linear"
        }}
      >
        <div
          className="absolute flex gap-6"
          style={{
            left: "26px",
            top: "32px",
            transform: `translate(${blackFaceX}px, ${blackFaceY}px)`
          }}
        >
          <EyeBall
            size={16}
            pupilSize={6}
            maxDistance={4}
            eyeColor="white"
            pupilColor="#2D2D2D"
            isBlinking={isBlackBlinking}
            mouseX={mouseX}
            mouseY={mouseY}
            forceLookX={blackForcedLookX}
            forceLookY={-4}
            forceLookWeight={blackForcedLookWeight}
          />
          <EyeBall
            size={16}
            pupilSize={6}
            maxDistance={4}
            eyeColor="white"
            pupilColor="#2D2D2D"
            isBlinking={isBlackBlinking}
            mouseX={mouseX}
            mouseY={mouseY}
            forceLookX={blackForcedLookX}
            forceLookY={-4}
            forceLookWeight={blackForcedLookWeight}
          />
        </div>
      </div>

      <div
        ref={orangeRef}
        className="auth-source-orange-character absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "0px",
          width: "240px",
          height: "200px",
          zIndex: 3,
          backgroundColor: "#FF9B6B",
          borderRadius: "120px 120px 0 0",
          transform: `skewX(${orangeSkew}deg)`,
          transformOrigin: "bottom center",
          transitionDuration: "700ms, 0ms",
          transitionProperty: "height, transform",
          transitionTimingFunction: "ease-in-out, linear"
        }}
      >
        <div
          className="absolute flex gap-8"
          style={{
            left: "82px",
            top: "90px",
            transform: `translate(${orangeFaceX}px, ${orangeFaceY}px)`
          }}
        >
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" mouseX={mouseX} mouseY={mouseY} forceLookX={-5} forceLookY={-4} forceLookWeight={purplePasswordProgress} />
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" mouseX={mouseX} mouseY={mouseY} forceLookX={-5} forceLookY={-4} forceLookWeight={purplePasswordProgress} />
        </div>
      </div>

      <div
        ref={yellowRef}
        className="auth-source-yellow-character absolute bottom-0 transition-all duration-700 ease-in-out"
        style={{
          left: "310px",
          width: "140px",
          height: "230px",
          backgroundColor: "#E8D754",
          borderRadius: "70px 70px 0 0",
          zIndex: 4,
          transform: `skewX(${yellowSkew}deg)`,
          transformOrigin: "bottom center",
          transitionDuration: "700ms, 0ms",
          transitionProperty: "height, transform",
          transitionTimingFunction: "ease-in-out, linear"
        }}
      >
        <div
          className="absolute flex gap-6"
          style={{
            left: "52px",
            top: "40px",
            transform: `translate(${yellowFaceX}px, ${yellowFaceY}px)`
          }}
        >
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" mouseX={mouseX} mouseY={mouseY} forceLookX={-5} forceLookY={-4} forceLookWeight={purplePasswordProgress} />
          <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" mouseX={mouseX} mouseY={mouseY} forceLookX={-5} forceLookY={-4} forceLookWeight={purplePasswordProgress} />
        </div>
        <div
          className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full"
          style={{
            left: "40px",
            top: "88px",
            transform: `translate(${yellowMouthX}px, ${yellowMouthY}px)`
          }}
        />
      </div>
    </div>
  );
}
