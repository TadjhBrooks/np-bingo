import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Container({
  className = '',
  children,
  ...props
}: ContainerProps): JSX.Element {
  return (
    <div
      className={[
        'max-w-md mx-auto relative flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 shadow-md',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
