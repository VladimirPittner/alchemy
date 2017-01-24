'use strict';

var _ = require('lodash');

var icomoon = require('./../../../fonticons/icomoon/selection.json');

function getIcons() {
  return icomoon.icons.map(function (item) { 
    return item.properties.ligatures 
  });
}

function getItemById(id, item) {
  var index =  _.findIndex(item, { id: id });
  if (index < 0) {
    throw new Error(id + ' not defined');
  }
  
  return { 
    index: index,
    item: item[index]
  }
}

function getPageIds(ids, sitemap) {
  var parsedIds = ids.split('.');
  
  var ret = {};
  
  if (parsedIds[0]) {
    var category = getItemById(parsedIds[0], sitemap);
    ret.category = category.index;
  }
  
  if (parsedIds[1]) {
    var page = getItemById(parsedIds[1], category.item.topics);
    ret.page = page.index;
  }
  
  if (parsedIds[2]) {
    var subPage = getItemById(parsedIds[2], page.item.sub);
    ret.subPage = subPage.index;
  }
  
  return ret;
}

module.exports.helpers = {
  getIcons: getIcons,
  getPageIds: getPageIds
}