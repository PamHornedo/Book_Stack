const Footer = () => (
  <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-white/40 bg-[#f0f9ff]">
    <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold text-accent">
        &copy; {new Date().getFullYear()} BookStack. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
