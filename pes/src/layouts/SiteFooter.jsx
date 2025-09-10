import '../styles/ui/SiteFooter.css'
import {Email, LocationOn, Phone} from '@mui/icons-material'

export default function SiteFooter() {

    return (
        <footer className="footer">
            {/* Main Footer Section - Three Columns */}
            <div className="container footer__main">
                <div className="footer__grid">
                    {/* Column 1 - Logo and Brand */}
                    <div className="footer__column">
                        <div className="footer__brand">
                            <img src="/logo.png" alt="MerryStar Logo" className="footer__logo"/>
                            <h3 className="footer__title">Merrystar Bilingual Kindergarten</h3>
                            <img src="/cambmerrystar1.png" alt="Cambridge MerryStar" className="footer__cambridge"/>
                        </div>
                    </div>

                    {/* Column 2 - Contact Info */}
                    <div className="footer__column">
                        <h3 className="footer__title">Contact</h3>

                        <div className="contact__section">
                            <h4 className="contact__subtitle">Headquarters:</h4>
                            <div className="footer__contact">
                                <div className="contact__item">
                                    <Phone className="contact__icon"/>
                                    <span>093 168 3999</span>
                                </div>
                                <div className="contact__item">
                                    <Email className="contact__icon"/>
                                    <span>contact@merrystar.edu.vn</span>
                                </div>
                                <div className="contact__item">
                                    <LocationOn className="contact__icon"/>
                                    <span>Tulip 09-38 & 40, Vinhomes Riverside 2, Phuc Loi Ward, Ha Noi</span>
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


