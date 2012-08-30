// GET home page
exports.index = function(req, res){
    console.log("rendering the index page: " + req.url);
  res.render('index', { title: 'Smoke Signal' });
};

var marked = require('marked');
var fs = require('fs');

// GET Details page
exports.details = function(req, res){
    console.log("rendering the DETAILS page: " + req.url);

    // a real ste wouldn't want to render page like this. But this is my first reason to read a local file.
    // So reading the markdown file. Pushing it through the md-->html processor. And then passing that
    // to jade template. These are all firsts for me.
    var markdown = fs.readFileSync('./public/SmokeSignalTutorial.md', 'utf-8');
    var raw = marked(markdown);
    res.render('details', { title: 'Details', rawhtml: raw});
};