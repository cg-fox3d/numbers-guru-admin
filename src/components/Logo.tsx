import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 80C20 71.1667 25.3333 65.8333 34 65.8333C42.6667 65.8333 48 71.1667 48 80C48 88.8333 42.6667 94.1667 34 94.1667C25.3333 94.1667 20 88.8333 20 80Z" />
      <path d="M50 10L50 55.8333C55.3333 55.8333 62.1667 50 68.5 42.5C74.8333 35 80 25.8333 80 20C80 11.1667 74.6667 5.83333 66 5.83333C57.3333 5.83333 50 10 50 10Z" />
      <path d="M50 55.8333C50 64.6667 44.6667 70 36 70" />
      <path d="M80 20C80 28.8333 74.6667 34.1667 66 34.1667C57.3333 34.1667 52.5 28.3333 50 24.1667" />
    </svg>
  );
}
