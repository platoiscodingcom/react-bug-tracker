var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
//models mongo
var ProjectModel = require('../models/Project');
var TaskModel = require('../models/Task');
var CategoryModel = require('../models/Category');
//schemas graphql
const TaskType = require('./TaskType').TaskType
const CategoryType = require('./CategoryType').CategoryType

//mongo
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectType = new GraphQLObjectType ({
  name: 'project',
  fields: function() {
    return {
      _id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      status: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }, 
      tasks: {
        type: new GraphQLList(GraphQLString)
      }, 
      categories: {
        type: new GraphQLList(GraphQLString)
      }
    }
  }
});

const ProjectQuery = new GraphQLObjectType({
  name: 'getProject',
  fields: function () {
    return {
      projects: {
        type: new GraphQLList(ProjectType),
          resolve: function () {
            const projects = ProjectModel.find().exec()
            if(!projects) throw new Error('Error')
            return projects
          }
      },
      project: {
        type: ProjectType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const projectDetails = ProjectModel.findById(params.id).exec()
          if(!projectDetails){ throw new Error('Error') }
          return projectDetails
        }
      }
    }
  }
});

exports.ProjectSchema = new GraphQLSchema({query: ProjectQuery});