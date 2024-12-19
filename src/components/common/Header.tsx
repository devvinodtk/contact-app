function Header({ title }: any) {
  return (
    <header className="bg-sky-50 bg-opacity-50 backdrop-blur-md shadow-sm border-b fixed sm:static top-0 left-0 w-full">
      <div className="max-w-7xl p-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl ml-10 font-semibold text-black">{title}</h1>
      </div>
    </header>
  );
}

export default Header;
