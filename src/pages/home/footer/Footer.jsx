import { GiNewspaper } from "react-icons/gi";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content items-center">
        <aside>
         
          <p className="flex items-center font-bold"><GiNewspaper className="text-2xl mr-2"/>The Daily Insight
            <br /></p>
         <div>
            <p>
                Providing News  since 1992
              </p>
              <p className="font-bold"> Email: sahariaralam8@gmail.com</p>
              <p className="font-bold"> Contact: 01949-017793</p>
         </div>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2023 - All right reserved by Shahariar Alam</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
