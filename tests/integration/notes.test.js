const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../../app'); // Adjust the path to your app file
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('NOTE API Integration Tests', () => {
  let itemId;

  // Before tests, connect to the test database
  const DB = process.env.DATABASE;

  before((done) => {
    mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.once('open', () => done());
  });

  // After tests, close the database connection
  after((done) => {
    mongoose.connection.close(() => done());
  });

  // Test for creating an item
  it('should create a new item', (done) => {
    this.timeout(10000);
    const newItem = {
      title: 'Test Note',
      body: 'This is a test Note',
    };

    chai
      .request(app)
      .post('/notes')
      .send(newItem)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('title', 'Test Note');
        expect(res.body).to.have.property('body', 'This is a test Note');
        itemId = res.body._id; // Store the item ID for later tests
        done();
      });
  });



  // Test for retrieving a single item by ID
  it('should retrieve a single item by ID', (done) => {
    this.timeout(10000);
    chai
      .request(app)
      .get(`/notes/${itemId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id', itemId);
        done();
      });
  });

  // Test for updating an item by ID
  it('should update an item by ID', (done) => {
    this.timeout(10000);
    const updatedItem = {
      title: 'Updated Test Note',
      body: 'This is an updated test Note',
    };

    chai
      .request(app)
      .put(`/notes/${itemId}`)
      .send(updatedItem)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title', 'Updated Test Note');
        done();
      });
  });

  // Test for deleting an item by ID
  it('should delete an item by ID', (done) => {
    this.timeout(10000);
    chai
      .request(app)
      .delete(`/notes/${itemId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Note Successfully Updated');
        done();
      });
  });
});
