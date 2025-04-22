import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-20 px-0">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
