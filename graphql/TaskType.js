var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
//models mongo
var ProjectModel = require('../models/Project');
var TaskModel = require('../models/Task');
//schemas graphql
const ProjectType = require('./ProjectType').ProjectType;

//mongo
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TaskType = new GraphQLObjectType ({
  name: 'task',
  fields: function() {
    return {
      _id: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      priority: {
        type: GraphQLString
      },
      status: {
        type: GraphQLString
      },
      type: {
        type: GraphQLString
      },
      project: {
        type: GraphQLString
      }
    }
  }
});

const TaskQuery = new GraphQLObjectType({
  name: 'getTask',
  fields: function () {
    return {
      tasks: {
        type: new GraphQLList(TaskType),
          resolve: function () {
            const tasks = TaskModel.find().exec()
            if(!tasks) throw new Error('Error')
            return tasks
          }
      },
      task: {
        type: TaskType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const taskDetails = ProjectModel.findById(params.id).exec()
          if(!taskDetails){ throw new Error('Error') }
          return taskDetails
        }
      }
    }
  }
});


exports.TaskSchema = new GraphQLSchema({query: TaskQuery});