'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PodcastSchema = Schema({
    title: String,
    temporada: String,
    description: String,
    image: String,
    duration: String,
    fecha_publicacion: String,
    categoria: String
});

module.exports = mongoose.model('Podcast',PodcastSchema);