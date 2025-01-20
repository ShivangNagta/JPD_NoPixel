import React from "react";

const FooterButton = ({ text, link }) => {
  return (
    <div>
      <a
        href={link}
        className="relative text-[#838383] hover:text-black transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full font-medium"
      >
        {text}
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="w-full h-full bg-[#EBEBEB]">
      <div className="w-full">
        <div className="grid gap-8 grid-cols-3 px-16">
          <div className="space-y-4">
            <p className="text-4xl text-muted-foreground text-black font-bold">
               Workify
            </p>
            <p className="text-xl text-muted-foreground text-[#838383] font-medium">
              Experience the future
              <br />
              of Hiring.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">About</h3>
            <nav className="flex flex-col space-y-2 text-[#838383] font-semibold text-xl">
              <FooterButton text="Contact" link="/contact" />
              <FooterButton text="Blog" link="/blog" />
              <FooterButton text="Our Story" link="/our-story" />
              <FooterButton text="Careers" link="/careers" />
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Company</h3>
            <nav className="flex flex-col space-y-2 text-[#838383] font-semibold text-xl">
              <FooterButton text="Press" link="/press" />
              <FooterButton text="Brand Assets" link="/brand-assets" />
              <FooterButton text="Terms of Service" link="/terms" />
              <FooterButton text="Privacy Policy" link="/privacy" />
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;