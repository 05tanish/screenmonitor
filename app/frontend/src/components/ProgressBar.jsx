export default function ProgressBar({ value, max = 100, threshold = 80 }) {
  const percentage = Math.min((value / max) * 100, 100);
  const isAlert = value >= threshold;

  return (
    <div className="w-full bg-white/20 rounded-full h-4 mb-2">
      <div
        className={`h-4 rounded-full transition-all duration-500 ${isAlert ? "bg-red-500 animate-pulse" : "bg-green-500"}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
