import '../styles/ui/SiteFooter.css'
import { LocationOn, Phone, Email, Facebook, Instagram, Twitter } from '@mui/icons-material'

export default function SiteFooter() {
  return (
    <footer className="footer">
      {/* Main Footer Section - Four Columns */}
      <div className="container footer__main">
        <div className="footer__grid">
          {/* Column 1 - Sunshine Preschool Info */}
          <div className="footer__column">
            <h3 className="footer__title">Sunshine Preschool</h3>
            <p className="footer__desc">
              Providing quality early childhood education in a nurturing environment where children develop confidence, creativity, and a love for learning.
            </p>
            <div className="footer__contact">
              <div className="contact__item">
                <LocationOn className="contact__icon" />
                <span>123 Education Street, Learning City</span>
              </div>
              <div className="contact__item">
                <Phone className="contact__icon" />
                <span>(555) 123-4567</span>
              </div>
              <div className="contact__item">
                <Email className="contact__icon" />
                <span>info@sunshinepreschool.edu</span>
              </div>
            </div>
          </div>

          {/* Column 2 - About */}
          <div className="footer__column">
            <h3 className="footer__title">About</h3>
            <ul className="footer__list">
              <li><a href="/about">About Us</a></li>
              <li><a href="/mission">Our Mission</a></li>
              <li><a href="/teachers">Teachers</a></li>
              <li><a href="/facilities">Facilities</a></li>
            </ul>
          </div>

          {/* Column 3 - Programs */}
          <div className="footer__column">
            <h3 className="footer__title">Programs</h3>
            <ul className="footer__list">
              <li><a href="/classes">Classes</a></li>
              <li><a href="/age-groups">Age Groups</a></li>
              <li><a href="/curriculum">Curriculum</a></li>
              <li><a href="/special-programs">Special Programs</a></li>
            </ul>
          </div>

          {/* Column 4 - Admissions */}
          <div className="footer__column">
            <h3 className="footer__title">Admissions</h3>
            <ul className="footer__list">
              <li><a href="/admission-process">Admission Process</a></li>
              <li><a href="/requirements">Requirements</a></li>
              <li><a href="/tuition">Tuition</a></li>
              <li><a href="/financial-aid">Financial Aid</a></li>
            </ul>
          </div>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <div className="footer__policies">
              <a href="/privacy" className="policy__link">Privacy Policy</a>
              <a href="/terms" className="policy__link">Terms of Service</a>
              <a href="/accessibility" className="policy__link">Accessibility</a>
            </div>
            <div className="footer__copyright">
              <p>© 2024 Sunshine Preschool. All rights reserved.</p>
            </div>
            <div className="footer__social">
              <a href="#" className="social__link">
                <Facebook className="social__icon" />
                <span>Facebook</span>
              </a>
              <a href="#" className="social__link">
                <Instagram className="social__icon" />
                <span>Instagram</span>
              </a>
              <a href="#" className="social__link">
                <Twitter className="social__icon" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


