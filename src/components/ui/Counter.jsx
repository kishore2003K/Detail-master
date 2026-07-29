import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export function Counter({ end, suffix = "", prefix = "", title }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center">
        {prefix}
        {inView ? (
          <CountUp end={end} duration={2.5} separator="," decimals={end % 1 !== 0 ? 1 : 0} />
        ) : (
          <span>0</span>
        )}
        {suffix}
      </div>
      <div className="text-luxury-gold uppercase tracking-wider text-sm font-medium">
        {title}
      </div>
    </div>
  );
}
