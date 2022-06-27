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
  const [countryloading,setCountryloading]=React.useState(false);
  const [details, setDetails] = React.useState({
    name: "",
    code: "",
    native: "",
    emoji: "",
    currency: "",
    phone: "",
    languages: [],
  });
  function getDetails(data){
    setDetails(data.data.country);
    setCountryloading(true)
  }

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
      .then((data) => (getDetails(data)));
  }, [country]);
  console.log(details)
  console.log(details.languages);
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
      <div>{countryloading ? <Card border="dark" className="mt-5">
        <Card.Header>{details.name}</Card.Header>
        <Card.Body>
          
          <Card.Text>
          <p><b>Country code  &nbsp;&nbsp;&nbsp; : { details.code}</b> </p>
          <p><b>Native   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: { details.native}</b> </p>
          <p><b>Currency &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: { details.currency}</b> </p>
          <p><b>Phone code   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          : { details.phone}</b></p>
           <p><b>Languages</b>  &nbsp;&nbsp;&nbsp;</p>
            { details.languages.map((lang) => (
          <p key={lang.code}><b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;: { lang.name}</b>
          </p>
        ))}
          
          
          </Card.Text>
        </Card.Body>
      </Card> :<h1></h1>}</div>
      
      </div>
    </Container>
  );
}

export default App;
