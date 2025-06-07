const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 text-center py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm">
          CineSage is currently under development. It features only English movies released before 2024.
        </p>
        <p className="text-xs mt-2 text-gray-500">
          &copy; {new Date().getFullYear()} CineSage. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;