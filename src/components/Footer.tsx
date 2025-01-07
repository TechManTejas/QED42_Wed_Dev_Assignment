export const Footer = () => {
  return (
    <>
      <section className="bg-white">
        <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            <div className="px-5 py-2">
              <img src="/funstore.png" className="h-24" />
            </div>
          </nav>
          <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © 2025 Fun Store, Inc. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
};
