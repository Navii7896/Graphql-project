const express = require('express')

const { graphqlHTTP } = require('express-graphql');

const app = express()

const PORT = 5002

const {
    GraphQLList
  } = require('graphql')

  const {
    GraphQLSchema
  } = require('graphql')



const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')

const BankType = new GraphQLObjectType({
    name: 'Bank',
    description: 'This represents a website made by a Owner(Programmer)',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
      userId: { type: GraphQLNonNull(GraphQLInt) },
    })
  })

  const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a users of banks',
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      name: { type: GraphQLNonNull(GraphQLString) },
    })
  })

  const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      banks: {
        type: new GraphQLList(BankType),
        description: 'List of All Banks',
        resolve: () => Banks
      },
      users: {
        type: new GraphQLList(UserType),
        description: 'List of All Users',
        resolve: () => Users
      },
      bank: {
        type: BankType,
        description: 'A Single Banks',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => Banks.find(bank => bank.id === args.id)
      },
      user: {
        type: UserType,
        description: 'A Single User',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => Users.find(user => user.id === args.id)
      }
    })
  })


  const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addBank: {
        type: BankType,
        description: 'Add a bank',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          bankId: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: (parent, args) => {
          const bank = { id: Banks.length + 1, name: args.name,bankId:args.userId }
          Banks.push(bank)
          return bank
        }
      },
      removeBank: {
          type: BankType,
          description: 'Remove a Bank',
          args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
          },
          resolve: (parent, args) => {
              Banks = Banks.filter(bank => bank.id !== args.id)
              return Banks[args.id]
          }
        },
      addUser: {
        type: UserType,
        description: 'Add an User',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: (parent, args) => {
          const user = { id: Users.length + 1, name: args.name }
          Users.push(user)
          return user
        }
      },
      removeUser: {
          type: UserType,
          description: 'Remove an user',
          args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
          },
          resolve: (parent, args) => {
              Users = Users.filter(user => user.id !== args.id)
              return Users[args.id]
          }
        },
        updateUser: {
          type: UserType,
          description: 'Update an User',
          args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name:{type:new GraphQLNonNull(GraphQLString)}
          },
          resolve: (parent, args) => {
              Owners[args.id - 1].name = args.name
              return Users[args.id - 1]
          }
        },
        updateBank: {
          type: BankType,
          description: 'Update a Bank',
          args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name:{type:new GraphQLNonNull(GraphQLString)},
            userId:{type:new GraphQLNonNull(GraphQLInt)}
          },
          resolve: (parent, args) => {
              Banks[args.id - 1].name = args.name
              Banks[args.id - 1].userId = args.userId
              return Users[args.id - 1]
          }
        },
    })
  })

  const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
  })

var Users= [
    { id: 1, name: 'Naveen' },
    { id: 2, name: 'Sharath' },
    { id: 3, name: 'Jaideep' },
    { id: 4, name: 'Naveen' },
    { id: 5, name: 'Sharath' },
    { id: 6, name: 'Jaideep' },
    { id: 7, name: 'Naveen' },
    { id: 8, name: 'Sharath' },
    { id: 9, name: 'Jaideep' }
]

var Banks = [
    { id: 1, name: 'Vijay Bank', userId: 1 },
    { id: 2, name: 'Stata Bank',  userId: 2 },
    { id: 3, name: 'HDFC',  userId: 3 },
    { id: 4, name: 'Baroda ',  userId: 4 },
    { id: 5, name: 'Axis',  userId: 5 },
    { id: 6, name: 'Canara',  userId: 6 },
    { id: 7, name: 'Gramina ',  userId: 7 },
    { id: 8, name: 'Bandan ',  userId: 8 }
]


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema:schema
  }))

  
  app.listen(5002, () => console.log('Server Running'))
  