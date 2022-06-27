import React from "react";
import { Container,Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const GET_COUNTRY = `{
  countries {
      name
      code
    }
}`;

const GET_COUNTRY_DETAILS = `
  query Country($countryCode: ID!) {
    country(code: $countryCode) {
      code
      name
      native
      emoji
      currency
      phone
      languages {
        code
        name
      }
    }
  }
`;

function App() {
  const [countrylist, setCountrylist] = React.useState([]);
  const [country, setCountry] = React.useState();
  const [details, setDetails] = React.useState({
    name: "",
    code: "",
    native: "",
    emoji: "",
    currency: "",
    phone: "",
    language: [{ code: "", name: "" }],
  });

  React.useEffect(() => {
    fetch("https://countries.trevorblades.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_COUNTRY }),
    })
      .then((response) => response.json())
      .then((data) => setCountrylist(data.data.countries));
  }, []);

  React.useEffect(() => {
    fetch("https://countries.trevorblades.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_COUNTRY_DETAILS,
        variables: { countryCode: country },
      }),
    })
      .then((response) => response.json())
      .then((data) => setDetails(data.data.country));
  }, [country]);
  console.log(setDetails);
  return (
    <div>
      <h1>Country List</h1>
      <select
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      >
      <option>--Select Country--</option>
        {countrylist.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <h1>{country}</h1>
      <h1>{details.name}</h1>
    </div>
  );
}

export default App;
