import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  wide?: boolean;
}

export function Layout({ children }: Props) {
  return (
    <div className="shell">
      <header className="site-header">
        <div className="inner">
          <a className="brand" href="#/">
            Simulasi JLPT N4 <span className="tag">Latihan</span>
          </a>
          <span className="header-note">N4 Challenge • 70 Soal • 115 Menit</span>
        </div>
      </header>
      <main className="container">{children}</main>
      <footer className="site-footer">
        <div className="container">
          Website latihan mandiri — tidak berafiliasi dengan JLPT. Skor latihan bukan skor resmi.
        </div>
      </footer>
    </div>
  );
}