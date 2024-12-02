function Header({ title }: any) {
  return (
    <header className="bg-sky-50 bg-opacity-50 backdrop-blur-md shadow-sm border-b">
      <div className="max-w-7xl py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-black">{title}</h1>
      </div>
    </header>
  );
}

export default Header;
