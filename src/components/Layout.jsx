
const Layout = ({ sideBar, children }) => (
    <div className="container my-3">
        <h1 className="display-6 pb-2 mb-4 border-bottom">SQLite Viewer</h1>

        {!sideBar && (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {children}
                </div>
            </div>
        )}

        {sideBar && (
            <div className="row">
                <div className="col-md-3">
                    {sideBar}
                </div>

                <div className="col-md-9">
                    {children}
                </div>
            </div>
        )}
    </div>
);

export default Layout;
