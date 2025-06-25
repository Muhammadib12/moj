import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 300, y: 200 });
  const [clickCount, setClickCount] = useState(0);
  const [showMiddleFinger, setShowMiddleFinger] = useState(false);
  const [showYesMessage, setShowYesMessage] = useState(false);
  const containerRef = useRef(null);

  // Move NO button to random position
  const moveNoButton = () => {
    const isMobile = window.innerWidth < 640;
    const buttonWidth = isMobile ? 180 : 150;
    const buttonHeight = isMobile ? 60 : 80;

    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const newX = Math.max(10, Math.random() * maxX);
    const newY = Math.max(10, Math.random() * maxY);

    setNoButtonPosition({ x: newX, y: newY });
  };

  // Handle NO button click
  const handleNoClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickCount + 1 === 2) {
      // Show middle finger animation and play sound
      setShowMiddleFinger(true);

      // Create audio context and play "واااااع" sound
      try {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          100,
          audioContext.currentTime + 1
        );

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 1
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
      } catch (error) {
        console.log("Audio not supported");
      }

      setTimeout(() => {
        setShowMiddleFinger(false);
        setClickCount(0);
      }, 2000);
    }

    moveNoButton();
  };

  // Handle YES button click
  const handleYesClick = () => {
    setShowYesMessage(true);

    // افتح رابط واتساب بعد نصف ثانية
    setTimeout(() => {
      const message = encodeURIComponent("اكيد داخذك محمد بتامر انت");
      const phone = "972506567035"; // 972 هو كود إسرائيل بدون +
      const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    }, 500);
  };

  // Initialize NO button position on mount
  useEffect(() => {
    moveNoButton();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-blue-900"
    >
      {/* Background YouTube Video */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <iframe
          className="absolute min-w-full min-h-full object-cover"
          style={{
            width: "100vw",
            height: "100vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(1.2)",
            border: "none",
          }}
          src="https://www.youtube.com/embed/ehYEOJo-UQw?autoplay=1&mute=1&loop=1&playlist=ehYEOJo-UQw&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&start=0&end=0"
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={false}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating Sea Elements */}
      <div className="absolute top-4 left-4 animate-bounce delay-100 text-xl sm:text-2xl md:text-3xl z-20">
        🌊
      </div>
      <div className="absolute top-4 right-4 animate-bounce delay-200 text-xl sm:text-2xl md:text-3xl z-20">
        🐠
      </div>
      <div className="absolute bottom-4 left-4 animate-bounce delay-300 text-xl sm:text-2xl md:text-3xl z-20">
        🦈
      </div>
      <div className="absolute bottom-4 right-4 animate-bounce delay-400 text-xl sm:text-2xl md:text-3xl z-20">
        🐙
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen p-8">
        {!showYesMessage ? (
          <>
            {/* Question */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12 px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 animate-pulse drop-shadow-lg">
                تبي تروح معي البحر؟ 🌊
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 animate-fadeIn drop-shadow-md">
                كركر! يلا نسبح ونلعب! 🏖️
              </p>
            </div>

            {/* Buttons */}
            <div className="relative w-full px-4 max-w-lg mx-auto">
              {/* Buttons Container */}
              <div className="flex flex-col gap-4 mb-8">
                {/* YES Button */}
                <button
                  onClick={handleYesClick}
                  className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700
                           text-white font-bold py-4 px-8 rounded-full text-base sm:text-lg md:text-xl
                           shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
                           border-4 border-white/20 z-20 w-full touch-manipulation min-h-[60px]"
                >
                  نعم! 😍
                </button>

                {/* NO Button (Moving) */}
                <button
                  onClick={handleNoClick}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700
                           text-white font-bold py-4 px-8 rounded-full text-base sm:text-lg md:text-xl
                           shadow-lg transform transition-all duration-300
                           border-4 border-white/20 z-10 w-full touch-manipulation min-h-[60px]"
                  style={{
                    position: clickCount > 0 ? "fixed" : "relative",
                    left:
                      clickCount > 0
                        ? `${Math.max(
                            20,
                            Math.min(
                              noButtonPosition.x,
                              window.innerWidth - 200
                            )
                          )}px`
                        : "auto",
                    top:
                      clickCount > 0
                        ? `${Math.max(
                            100,
                            Math.min(
                              noButtonPosition.y,
                              window.innerHeight - 120
                            )
                          )}px`
                        : "auto",
                    maxWidth: clickCount > 0 ? "180px" : "100%",
                    transition: "all 0.3s ease-out",
                  }}
                >
                  لا 😤
                </button>
              </div>
            </div>
          </>
        ) : (
          /* YES Message */
          <div className="text-center animate-fadeIn px-4 max-w-lg mx-auto">
            <div className="text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-8 animate-bounce">
              🎉
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
              يااااه! 🥳
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 sm:mb-8 drop-shadow-md">
              روحي نخطط انستا كركر! 📱✨
            </p>
            <div className="text-4xl sm:text-6xl md:text-8xl animate-spinSlow">
              🌊🏖️🌊
            </div>
          </div>
        )}
      </div>

      {/* Middle Finger Animation */}
      {showMiddleFinger && (
        <div className="fixed top-1/2 -right-16 sm:-right-20 transform -translate-y-1/2 z-50">
          <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl animate-slideAcross">
            🖕
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes waveGradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes wave1 {
          0% {
            transform: translateX(0) scaleY(1);
          }
          25% {
            transform: translateX(-100px) scaleY(1.2);
          }
          50% {
            transform: translateX(-200px) scaleY(0.8);
          }
          75% {
            transform: translateX(-300px) scaleY(1.1);
          }
          100% {
            transform: translateX(-400px) scaleY(1);
          }
        }

        @keyframes wave2 {
          0% {
            transform: translateX(0) scaleY(1);
          }
          25% {
            transform: translateX(100px) scaleY(0.8);
          }
          50% {
            transform: translateX(200px) scaleY(1.3);
          }
          75% {
            transform: translateX(300px) scaleY(0.9);
          }
          100% {
            transform: translateX(400px) scaleY(1);
          }
        }

        @keyframes wave3 {
          0% {
            transform: translateX(0) scaleY(1);
          }
          25% {
            transform: translateX(-150px) scaleY(1.1);
          }
          50% {
            transform: translateX(-300px) scaleY(0.9);
          }
          75% {
            transform: translateX(-450px) scaleY(1.2);
          }
          100% {
            transform: translateX(-600px) scaleY(1);
          }
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-50px) rotate(-180deg);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(360deg);
          }
        }

        @keyframes mainDance {
          0%,
          100% {
            transform: rotate(-15deg) scale(1) translateY(0px);
          }
          25% {
            transform: rotate(15deg) scale(1.1) translateY(-30px);
          }
          50% {
            transform: rotate(-10deg) scale(0.9) translateY(15px);
          }
          75% {
            transform: rotate(20deg) scale(1.05) translateY(-20px);
          }
        }

        @keyframes sideDanceLeft {
          0%,
          100% {
            transform: translateX(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateX(-20px) rotate(-45deg) scale(1.2);
          }
          50% {
            transform: translateX(30px) rotate(45deg) scale(0.8);
          }
          75% {
            transform: translateX(-10px) rotate(-30deg) scale(1.1);
          }
        }

        @keyframes sideDanceRight {
          0%,
          100% {
            transform: translateX(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateX(20px) rotate(45deg) scale(1.2);
          }
          50% {
            transform: translateX(-30px) rotate(-45deg) scale(0.8);
          }
          75% {
            transform: translateX(10px) rotate(30deg) scale(1.1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideAcross {
          0% {
            transform: translateX(0) translateY(-50%);
          }
          100% {
            transform: translateX(-400px) translateY(-50%);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float1 {
          animation: float1 6s ease-in-out infinite;
        }

        .animate-float2 {
          animation: float2 8s ease-in-out infinite;
        }

        .animate-float3 {
          animation: float3 7s ease-in-out infinite;
        }

        .animate-mainDance {
          animation: mainDance 2s ease-in-out infinite;
        }

        .animate-sideDanceLeft {
          animation: sideDanceLeft 1.8s ease-in-out infinite;
        }

        .animate-sideDanceRight {
          animation: sideDanceRight 2.2s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideAcross {
          animation: slideAcross 2s ease-out;
        }

        .animate-spinSlow {
          animation: spinSlow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
