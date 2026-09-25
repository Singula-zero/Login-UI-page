import { ArrowRight } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface InteractiveAuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const InteractiveAuthButton = forwardRef<HTMLButtonElement, InteractiveAuthButtonProps>(
  ({ text, className = "", ...props }, ref) => (
    <button ref={ref} className={`auth-source-submit ${className}`} {...props}>
      <span className="auth-source-submit-label">{text}</span>
      <span className="auth-source-submit-hover">
        <span>{text}</span>
        <ArrowRight aria-hidden="true" size={16} />
      </span>
    </button>
  )
);

InteractiveAuthButton.displayName = "InteractiveAuthButton";
