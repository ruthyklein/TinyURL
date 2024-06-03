import React, { useEffect, useState } from 'react';
import DaysOfWeekChart from './component/daysOfWeekChart/DaysOfWeekChart';
import SourcesChart from './component/sourcesChart/SourcesChart';
import './App.css';

const App = () => {
  const [urlData, setUrlData] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/links')
      .then((response) => response.json())
      .then((data) => setUrlData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div>
      <main>
        {urlData.length > 0 ? (
          <>
            <DaysOfWeekChart links={urlData} onLinkClick={handleLinkClick} />
            <SourcesChart links={urlData} selectedLink={selectedLink} />
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </main>
    </div>
  );
};

export default App;
