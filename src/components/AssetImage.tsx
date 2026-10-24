import { useEffect, useState } from 'react';
import { publicAsset } from '../lib/publicAsset';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function AssetImage({ src, alt, className }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const url = publicAsset(src);

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  if (failed) {
      return (
        <div className="asset-frame" role="img" aria-label={alt}>
          Gambar tidak dapat dimuat. Periksa koneksi lalu muat ulang halaman.
        </div>
      );
    }

    return (
      <div className="asset-stack">
        {!loaded && (
          <div className="asset-frame asset-placeholder" aria-hidden="true">
            Memuat gambar…
          </div>
        )}
        <img
          src={url}
          alt={alt}
          className={[className, loaded ? 'is-loaded' : 'is-loading'].filter(Boolean).join(' ')}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }