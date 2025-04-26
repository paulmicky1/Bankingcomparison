import React, { useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import Header from "./Header";

const banksData = [
  { 
    name: "Danske Bank", 
    fees: "High", 
    benefits: "No monthly fees for students", 
    requirements: "CPR number required",
    logo: "https://logo.clearbit.com/danskebank.dk"
  },
  { 
    name: "Nordea", 
    fees: "Medium", 
    benefits: "Easy online banking", 
    requirements: "Passport and residence proof",
    logo: "https://logo.clearbit.com/nordea.com"
  },
  { 
    name: "Nykredit", 
    fees: "Low", 
    benefits: "Free debit card", 
    requirements: "Student ID required",
    logo: "https://logo.clearbit.com/nykredit.dk"
  },
];

// Fee sorting priority
const feePriority = {
  Low: 1,
  Medium: 2,
  High: 3
};

export default function BankComparator() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredBanks = banksData
    .filter((bank) => bank.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "fees") return feePriority[a.fees] - feePriority[b.fees];
      return 0;
    });

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h2 className="text-center mb-4 text-primary fw-bold">Compare Banks for International Students</h2>

        {/* Search & Sorting */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="search">
              <Form.Label className="fw-semibold">Search Banks</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bank name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-primary shadow-sm"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="sort">
              <Form.Label className="fw-semibold">Sort by</Form.Label>
              <Form.Select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border-primary shadow-sm"
              >
                <option value="name">Name</option>
                <option value="fees">Fees</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Bank Cards */}
        {filteredBanks.length === 0 ? (
          <p className="text-center text-muted">No banks found matching your search.</p>
        ) : (
          <Row>
            {filteredBanks.map((bank, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="shadow-lg border-0 rounded-lg bank-card">
                  <div className="logo-container">
                    <Card.Img
                      variant="top"
                      src={bank.logo}
                      alt={`${bank.name} logo`}
                      className="bank-logo"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=Bank+Logo")}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold text-dark">{bank.name}</Card.Title>
                    <Card.Text>
                      <strong className="text-primary">Fees:</strong> {bank.fees} <br />
                      <strong className="text-success">Benefits:</strong> {bank.benefits} <br />
                      <strong className="text-danger">Requirements:</strong> {bank.requirements}
                    </Card.Text>
                    <button className="btn btn-primary w-100">Learn More</button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Footer */}
        <footer className="text-center text-muted mt-4">
          <p>Information is provided for general guidance only. Verify with the bank.</p>
        </footer>
      </Container>

      {/* CSS Styling */}
      <style>{`
        .bank-card {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .bank-card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
        }
        .logo-container {
          background-color: #f8f9fa;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px;
        }
        .bank-logo {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }
      `}</style>
    </>
  );
}
