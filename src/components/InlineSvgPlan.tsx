import { useEffect, useState } from 'react';

type InlineSvgPlanProps = {
  url: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
};

function isSvgUrl(url: string) {
  try {
    const pathname = new URL(url, window.location.origin).pathname;
    return pathname.toLowerCase().endsWith('.svg');
  } catch {
    return url.toLowerCase().endsWith('.svg');
  }
}

function prepareSvgMarkup(markup: string) {
  return markup.replace(/<\?xml[^?]*\?>\s*/i, '').trim();
}

export function InlineSvgPlan({ url, alt, className, fallbackClassName }: InlineSvgPlanProps) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(!isSvgUrl(url));

  useEffect(() => {
    if (!isSvgUrl(url)) {
      setUseFallback(true);
      setSvgMarkup(null);
      return;
    }

    let cancelled = false;
    setUseFallback(false);
    setSvgMarkup(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.status}`);
        }
        return response.text();
      })
      .then((markup) => {
        if (!cancelled) {
          setSvgMarkup(prepareSvgMarkup(markup));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUseFallback(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (useFallback) {
    return (
      <img className={fallbackClassName ?? className} src={url} alt={alt} draggable={false} />
    );
  }

  if (!svgMarkup) {
    return <div className={className} role="img" aria-label={alt} aria-busy="true" />;
  }

  return (
    <div
      className={className}
      role="img"
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
