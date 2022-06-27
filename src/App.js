import React, { Component } from "react";
import { Container, Form, Card, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [countryloading, setCountryloading] = React.useState(false);
  const [details, setDetails] = React.useState({
    name: "",
    code: "",
    native: "",
    emoji: "",
    currency: "",
    phone: "",
    languages: [],
  });
  function getDetails(data) {
    setDetails(data.data.country);
    setCountryloading(true);
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
      .then((data) => getDetails(data));
  }, [country]);
  console.log(details);
  console.log(details.languages);
  return (
    <Container>
      <h1 className="text-center my-5">Country Directory</h1>
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
        <div>
          {countryloading ? (
            <Card border="dark" className="mt-5">
              <Card.Header>Country Info</Card.Header>
              <Card.Body>
                <Card.Text>
                <Row>
                    <div className="col-6">
                      <h6>Name</h6>
                    </div>
                    <div className="col-6">
                      <p>
                        <h6>: {details.name}</h6>
                      </p>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-6">
                      <h6>Country code</h6>
                    </div>
                    <div className="col-6">
                      <p>
                        <h6>: {details.code}</h6>
                      </p>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-6">
                      <h6>Native</h6>
                    </div>
                    <div className="col-6">
                      <p>
                        <h6>: {details.native}</h6>
                      </p>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-6">
                      <h6>Currency</h6>
                    </div>
                    <div className="col-6">
                      <p>
                        <h6>: {details.currency}</h6>
                      </p>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-6">
                      <h6>Phone code</h6>
                    </div>
                    <div className="col-6">
                      <p>
                        <h6>: {details.phone}</h6>
                      </p>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-6">
                      <h6>Languages</h6>
                    </div>
                    <div className="col-6">
                    {details.languages.map((lang) => (
                    <h6 key={lang.code}>: {lang.name}</h6>
                  ))}
                    </div>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <h1></h1>
          )}
        </div>
      </div>
    </Container>
  );
}

export default App;
