import '../styles/ui/SiteFooter.css'
import { LocationOn, Phone, Email } from '@mui/icons-material'

export default function SiteFooter() {
  return (
    <footer className="footer">
      {/* Main Footer Section - Two Columns */}
      <div className="container footer__main">
        <div className="footer__grid">
          {/* Column 1 - Contact Info */}
          <div className="footer__column">
            <h3 className="footer__title">Liên hệ</h3>
            
            {/* Cơ sở 1 */}
            <div className="contact__section">
              <h4 className="contact__subtitle">Cơ sở chính:</h4>
              <div className="footer__contact">
                <div className="contact__item">
                  <Phone className="contact__icon" />
                  <span>093 168 3999</span>
                </div>
                <div className="contact__item">
                  <Email className="contact__icon" />
                  <span>contact@merrystar.edu.vn</span>
                </div>
                <div className="contact__item">
                  <LocationOn className="contact__icon" />
                  <span>Tulip 09-38 & 40, Khu đô thị Vinhomes Riverside 2, Phường Phúc Lợi, TP. Hà Nội</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__copyright">
            <p>Copyright © 2021 MerryStar all rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


