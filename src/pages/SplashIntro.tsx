import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Languages } from "lucide-react";
import "./SplashIntro.css";

type AnimationPhase = "scanning" | "extracting" | "validating" | "complete";

interface SplashIntroProps {
  onComplete?: () => void;
}

export function SplashIntro({ onComplete }: SplashIntroProps) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<AnimationPhase>("scanning");

  useEffect(() => {
    // Phase 1: Scanning (0-0.6s)
    const scanTimer = setTimeout(() => {
      setPhase("extracting");
    }, 600);

    // Phase 2: Extracting (0.6-1.2s)
    const extractTimer = setTimeout(() => {
      setPhase("validating");
    }, 1200);

    // Phase 3: Validating (1.2-1.8s)
    const validateTimer = setTimeout(() => {
      setPhase("complete");
    }, 1800);

    // Redirect or Complete (2.8s)
    const completionTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      } else {
        navigate("/dashboard");
      }
    }, 2800);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(extractTimer);
      clearTimeout(validateTimer);
      clearTimeout(completionTimer);
    };
  }, [navigate]);

  return (
    <div className="splash-container">
      {/* Background Particles/Dots */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i % 5}`}></div>
        ))}
      </div>

      <div className="doc-area">
        <div className={`doc-wrapper ${phase}`}>
          {/* Laser Scan Line */}
          <div className="scanner-line">
            <div className="scanner-flare"></div>
          </div>
          
          <div className="doc-header"></div>
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className={`doc-body-line ${phase === "scanning" ? "pulse" : ""}`} 
              style={{ width: `${Math.random() * 40 + 60}%` }}
            ></div>
          ))}

          {/* AI Extraction Markers */}
          {(phase === "extracting" || phase === "validating" || phase === "complete") && (
            <>
              <div className="detection-marker marker-name">
                <div className="marker-box"></div>
              </div>
              <div className="detection-marker marker-amount">
                <div className="marker-box"></div>
              </div>
              <div className="detection-marker marker-id">
                <div className="marker-box"></div>
              </div>
            </>
          )}

          {/* Result Phase */}
          <div className={`success-overlay ${phase === "complete" ? "active" : ""}`}>
            <div className="brand-logo mb-4">
              <div className="logo-icon-wrapper">
                <Languages className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="success-brand">ClaimLens</h2>
            <p className="success-tagline">AI-Powered Healthcare Claims Intelligence</p>
          </div>
        </div>
      </div>
    </div>
  );
}
