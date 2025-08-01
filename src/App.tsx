import { TaskProvider } from './context/TaskContext';
import { AppLayout } from './components/layout/AppLayout';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <AppLayout />
    </TaskProvider>
  );
}

export default App;
