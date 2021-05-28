import { useDatabase, DATABASE_STATE } from '../hooks/useDatabase'
import Loader from './Loader'
import DatabaseSelector from './DatabaseSelector'
import Schema from './Schema'
import Command from './Command'
import Controls from './Controls';

const App = () => {
    const { databaseState, loadDatabase, execCommand, closeDatabase, exportDatabase } = useDatabase();

    switch (databaseState) {
        case DATABASE_STATE.busy:
            return <Loader />

        case DATABASE_STATE.notLoaded:
            return <DatabaseSelector loadDatabase={loadDatabase} />

        case DATABASE_STATE.ready:
        case DATABASE_STATE.runningCommand:
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
