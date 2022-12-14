import Header from '@components/Header';
import Footer from '@components/Footer';

function MainLayout({ children }) {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
