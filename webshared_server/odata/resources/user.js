/**
 * Created by Administrator on 2015/9/9 0009.
 */
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../models');

//auth = require('../auth');

//resources = require('node-odata').resources;

module.exports = Resource('users', model.users);
