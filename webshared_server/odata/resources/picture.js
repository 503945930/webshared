/**
 * Created by Administrator on 2015/9/23 0023.
 */
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../models');

//auth = require('../auth');

//resources = require('node-odata').resources;

module.exports = Resource('pictrues', model.pictrues);