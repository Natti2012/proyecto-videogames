const { Videogame, Genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({
          released: "1990-12-20",
          description: "jejudu lallasd jdeia hnclz dh huzdyf ñluazzzzl kla<u< h<dufhu<y ",
          rating: 3.5,
          image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
          platforms: ["playStation5 , pc"],
          genres: ["arcade", "action"]
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
       it('should throw an error if the name has special characters', () => {
        Videogame.create({
          name: 'Super Mario Bros &$$',
          released: "1990-12-20",
          description: "jejudu lallasd jdeia hnclz dh huzdyf ñluazzzzl kla<u< h<dufhu<y ",
          rating: 3.5,
          image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
          platforms: ["playStation5 , pc"],
          genres: ["arcade", "action"]
        });
      });
      it('should work when its a valid name', () => {
        Videogame.create({
          name: 'Super Mario Bros',
          released: "1990-12-20",
          description: "jejudu lallasd jdeia hnclz dh huzdyf ñluazzzzl kla<u< h<dufhu<y ",
          rating: 3.5,
          image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
          platforms: ["playStation5 , pc"],
          genres: ["arcade", "action"]
        });
      });
    });
  });
});
