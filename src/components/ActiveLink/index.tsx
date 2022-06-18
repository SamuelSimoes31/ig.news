import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement;
  activeClassName: string;
}

export default function ActiveLink({
  activeClassName,
  children,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : '';

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}
    </Link>
  );
}