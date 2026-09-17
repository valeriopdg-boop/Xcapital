import { useEffect, useState } from "react";

function currentLocation() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function useClientLocation() {
  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    const sync = () => setLocation(currentLocation());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    document.documentElement.scrollTop = 0;
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    }
  }, [location]);

  return location;
}

export function navigate(href) {
  const destination = new URL(href, window.location.origin);
  if (destination.origin !== window.location.origin) {
    window.location.assign(destination.href);
    return;
  }

  window.history.pushState({}, "", `${destination.pathname}${destination.search}${destination.hash}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function Link({ href, children, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank"
    ) return;

    const destination = new URL(href, window.location.origin);
    if (destination.origin !== window.location.origin) return;
    event.preventDefault();
    navigate(href);
  };

  return <a href={href} onClick={handleClick} {...props}>{children}</a>;
}

