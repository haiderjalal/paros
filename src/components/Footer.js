import { ArrowUpIcon } from './Icons';
import { site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/logo.png" alt="Paros logo" width="84" height="84" loading="lazy" />
          <p>Fresh from the fire to your table.</p>
        </div>
        <div>
          <h4>Find us</h4>
          <p>{site.address}</p>
          <p>
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li>
              <a href="#story">Our story</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#order">Visit</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-wordmark reveal" aria-hidden="true">
        Paros
      </div>

      <div className="container footer-bottom">
        <p className="copyright">© {new Date().getFullYear()} Paros. Made fresh to order.</p>
        <a className="to-top" href="#top" aria-label="Back to top">
          <ArrowUpIcon />
        </a>
      </div>
    </footer>
  );
}
