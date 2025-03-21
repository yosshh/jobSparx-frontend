export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 3, // Controls animation speed in seconds
  showBorder = true,
}) {
  return (
    <div className={`relative mx-auto flex max-w-fit items-center justify-center ${className}`}>
      {/* Border container with animated gradient */}
      {showBorder && (
        <div
          className="absolute inset-0 rounded-[1.25rem] p-[3px] animate-gradient-border"
          style={{
            background: `linear-gradient(90deg, ${colors.join(", ")})`,
            backgroundSize: "300% 100%",
            animationDuration: `${animationSpeed}s`, // ✅ Dynamically applying animation speed
          }}
        />
      )}
      
      {/* Inner white background container */}
      <div className="relative z-10 px-4 py-2 rounded-[1.2rem] bg-white">
        {/* Gradient Animated Text */}
        <span
          className="text-transparent bg-clip-text animate-gradient-text"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            animationDuration: `${animationSpeed}s`, // ✅ Ensuring animation speed applies
          }}
        >
          {children}
        </span>
      </div>
    </div>
  );
}
