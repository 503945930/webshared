/**
 * Created by Administrator on 2015/10/16 0016.
 */
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../models');

//auth = require('../auth');

//resources = require('node-odata').resources;

module.exports = Resource('piccomments', model.piccomments);