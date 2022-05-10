/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, Genre, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  released: "1990-12-20",
  description: "jejudu lallasd jdeia hnclz dh huzdyf ñluazzzzl kla<u< h<dufhu<y ",
  rating: 3.5,
  image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  platforms: ["playStation5 , pc"],
  genres: ["arcade", "action"]

};
const videogameNull ={
   released: "1990-12-20",
  description: "jejudu lallasd jdeia hnclz dh huzdyf ñluazzzzl kla<u< h<dufhu<y ",
  rating: 3.5,
  image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  platforms: ["playStation5 , pc"],
  genres: ["arcade", "action"]
}

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true }))
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200 in routes /videogames' , () =>
      agent.get('/videogames').expect(200)
      .expect('Content-Type', /json/ )
    );
  });
});
