
const Layout = ({ topBar, sideBar, children }) => (
    <div className="container my-3">
        {topBar}

        <div className="row">
            <div className="col-md-4">
                {sideBar}
            </div>

            <div className="col">
                {children}
            </div>
        </div>
    </div>
);

export default Layout;
