import { useDatabase, DATABASE_STATUS } from '../hooks/useDatabase'
import Loader from './Loader'
import DatabaseSelector from './DatabaseSelector'
import Schema from './Schema'
import Command from './Command'
import Controls from './Controls';

const App = () => {
    const { databaseStatus, loadDatabase, execCommand, closeDatabase, exportDatabase } = useDatabase();

    switch (databaseStatus) {
        case DATABASE_STATUS.busy:
            return <Loader />

        case DATABASE_STATUS.notLoaded:
            return <DatabaseSelector loadDatabase={loadDatabase} />

        case DATABASE_STATUS.ready:
        case DATABASE_STATUS.runningCommand:
        default:
            return (
                <>
                    <Controls closeDatabase={closeDatabase} exportDatabase={exportDatabase} />

                    <div className="row">
                        <div className="col-md-3">
                            <Schema execCommand={execCommand} />
                        </div>

                        <div className="col-md-9">
                            <Command execCommand={execCommand} />
                        </div>
                    </div>
                </>
            );
    }
};

export default App;
