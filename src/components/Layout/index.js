import Header from '../Header/index';
import Footer from '../Footer/index';
export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        </div>
    )
}
    