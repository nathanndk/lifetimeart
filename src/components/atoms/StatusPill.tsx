import { memo } from "react";

type StatusPillProps = {
  label: string;
};

function StatusPillBase({ label }: StatusPillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[9999px] bg-neutral-800 text-white text-sm px-3 py-1 shadow-xs">
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full bg-neutral-200"
      />
      {label}
    </span>
  );
}

const StatusPill = memo(StatusPillBase);
export default StatusPill;
