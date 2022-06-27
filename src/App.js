import React, { Component } from "react";
import { Container,Form,Card } from "react-bootstrap";
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
    <Container>
      <h1 className="text-center">Country Directory</h1>
      <div className="col-6 mx-auto ">
      <Form.Select
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      >
      <option>--Select Country--</option>
        {countrylist.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </Form.Select>
      
      <Card border="dark" className="mt-5">
        <Card.Header>Country Info</Card.Header>
        <Card.Body>
          <Card.Title>{details.name}</Card.Title>
          
          <Card.Text>
          <p><b>Country code :</b>  &nbsp;&nbsp;&nbsp; {details.code}</p>
          <p><b>Native :</b>  &nbsp;&nbsp;&nbsp; {details.native}</p>
          <p><b>Currency:</b>  &nbsp;&nbsp;&nbsp; {details.currency}</p>
          <p><b>Phone code :</b>  &nbsp;&nbsp;&nbsp; {details.phone}</p>
          
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </Container>
  );
}

export default App;
