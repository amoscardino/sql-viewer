
const Layout = ({ children }) => (
    <div className="container my-3">
        <header>
            <h1 className="display-6 pb-2 mb-3 border-bottom">SQLite Viewer</h1>
        </header>

        <main>
            {children}
        </main>

        <footer className="pt-2 mt-3 border-top text-center text-muted">
            © {new Date().getFullYear()} Andrew Moscardino ・ <a href="https://moscardino.net">moscardino.net</a>
        </footer>
    </div>
);

export default Layout;
