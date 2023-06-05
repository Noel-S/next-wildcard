import { headers } from 'next/headers';

const TitleComponent = () => {
  // get request header
  const headersList = headers();
  const business = headersList.get('business');
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>{business}</h1>
    </div>
  );
};

export default TitleComponent;