import './App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

//Importing Images
import avertro from './images/avertro-logo.svg'

//Importing Component
import ObjectiveList from './components/ObjectivePanel/ObjectivePanle';

function App() {
  return (
    <div className="container">
      <header className="logo-bar">
        <img src={avertro} alt="logo" width="250px" height="25%" />
      </header>
      <Container maxWidth="xl">
        <p>Set Security Strategy</p>
        <hr />
        <Box sx={{ borderRadius: '16px', background: '#fff' }}>
          <ObjectiveList />
        </Box>
      </Container>
    </div >
  );
}

export default App;
