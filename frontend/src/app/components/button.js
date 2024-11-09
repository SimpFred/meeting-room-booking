export default function Button({ onClick, text, bgColor = 'var(--foreground)' }) {
  return (
    <button onClick={onClick}
      style={{ backgroundColor: bgColor }}
      className={`w-full rounded-[16px] border border-solid p-[16px] gap-[16px] text-white no-underline flex items-center justify-center`}>
      {text}
    </button>
  );
}
