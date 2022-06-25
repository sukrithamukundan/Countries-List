import React from "react";
const DETAILS_QUERY = `{
  countries {
      name
      code
    }
}`;

function App() {
  const [details, setDetails] = React.useState([]);
  React.useEffect(() => {
    fetch('https://countries.trevorblades.com/graphql/', { method: "POST",
     headers: { "Content-Type": "application/json" }, 
     body: JSON.stringify({ query: DETAILS_QUERY })
    }).then(response => response.json())
    .then(data => setDetails(data.data.countries)) }, []);
  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {details.map((detail)=>(
        <li key={detail.id}>{detail.name}</li>))}
      </ul>
    </div>
  );
}



export default App;
