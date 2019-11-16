var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
//models mongo
var ProjectModel = require('../models/Project');
var CategoryModel = require('../models/Category');
//schemas graphql
const ProjectType = require('./ProjectType')

//mongo
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategoryType = new GraphQLObjectType ({
  name: 'category',
  fields: function() {
    return {
      _id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      projects: {
        type: new GraphQLList(GraphQLString)
      }
    }
  }
});

const CategoryQuery = new GraphQLObjectType({
  name: 'getCategory',
  fields: function () {
    return {
      categories: {
        type: new GraphQLList(CategoryType),
          resolve: function () {
            const categories = CategoryModel.find().exec()
            if(!categories) throw new Error('Error')
            return categories
          }
      },
      category: {
        type: CategoryModel,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const categoryDetails = CategoryModel.findById(params.id).exec()
          if(!categoryDetails){ throw new Error('Error') }
          return categoryDetails
        }
      }
    }
  }
});
exports.CategorySchema = new GraphQLSchema({query: CategoryQuery});