export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`border px-2 py-1 rounded w-full ${props.className}`}
  />
);