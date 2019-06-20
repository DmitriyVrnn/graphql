const grpahql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = grpahql;

const Movies = require('../models/Movie');
const Directors = require('../models/Director');

/*const directorJson = [
    {"name": "Quentin Tarantino", "age": 55}, //5d0b6c37cbc5f72d2424d72c
    {"name": "Roadford", "age": 72}, //5d0b6e00cbc5f72d2424d72f
    {"name": "Nolan", "age": 46}, //5d0b6e0ecbc5f72d2424d730
    {"name": "Richie", "age": 47} //5d0b6e1acbc5f72d2424d731
]*/

/*const moviesJson = [
    {"name": "Pulp Fiction", "genre": "Crime", "directorId": "5d0b6c37cbc5f72d2424d72c"},
    {"name": "1984", "genre": "Sci-Fi", "directorId": "5d0b6e00cbc5f72d2424d72f"},
    {"name": "Origin", "genre": "Sci-Fi", "directorId": "5d0b6e0ecbc5f72d2424d730"},
    {"name": "Snatch", "genre": "Crime", "directorId": "5d0b6e1acbc5f72d2424d731"},
    {"name": "V For Vendetta", "genre": "Thriller", "directorId": "5d0b6e00cbc5f72d2424d72f"},
    {"name": "The Hateful Eight", "genre": "Comedy", "directorId": "5d0b6c37cbc5f72d2424d72c"},
    {"name": "Ignorious Basterds", "genre": "Crime", "directorId": "5d0b6e1acbc5f72d2424d731"},
]*/

/*const movies = [{
        id: 1,
        name: 'Pulp Fiction',
        genre: 'Crime',
        directorID: 1
    },
    {
        id: 2,
        name: 'Mov2',
        genre: 'Thriller',
        directorID: 2
    },
    {
        id: 3,
        name: 'Mov3',
        genre: 'Sci-Fi',
        directorID: 3
    },
    {
        id: 4,
        name: 'Pn',
        genre: 'Comedy',
        directorID: 2
    },
    {
        id: 5,
        name: 'Movi',
        genre: 'Crime',
        directorID: 1
    },
    {
        id: 6,
        name: 'Movi',
        genre: 'Crime',
        directorID: 1
    },
    {
        id: 7,
        name: 'Movi',
        genre: 'Crime',
        directorID: 1
    },
]*/

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                // return directors.find(director => director.id === parent.id);
                return Directors.findById(parent.directorId);
            }
        }
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies.filter(movie => movie.directorId === parent.id);
                return Movies.find({
                    directorId: parent.id
                });
            },
        },
    }),
});


const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // return movies.find(movie => movie.id === args.id);
                return Movies.findById(args.id);
            },
        },
        director: {
            type: DirectorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // return directors.find(director => director.id === args.id);
                return Directors.findById(args.id);
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies;
                return Movies.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                // return directors;
                return Directors.find({});
            }
        }
    }
});

//Export query
module.exports = new GraphQLSchema({
    query: Query,
})