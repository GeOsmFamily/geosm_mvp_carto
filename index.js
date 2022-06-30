const express = require('express');
var http = require('http');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const executeOgr2Ogr = require('./src/create_gpkg');
const addlayer = require('./src/add_layer');

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.post('/creategpkg', (req, res) => {
    var sql = req.body.sql;
    var instance = req.body.instance;
    var thematique_name = req.body.thematique_name;
    var thematique_id = req.body.thematique_id;
    var save_path = executeOgr2Ogr.executeOgr2Ogr(sql, instance, thematique_name, thematique_id);
    res.send({ "gpkg": save_path });
}
);

app.post('/addlayer', (req, res) => {
    var qgis_project_name = req.body.qgis_project_name;
    var path_qgis = req.body.path_qgis;
    var gpkg_path = req.body.gpkg_path;
    var geometry = req.body.geometry;
    var identifiant = req.body.identifiant;
    var wms_type = req.body.wms_type;
    var path_logo = req.body.path_logo;
    var color = req.body.color;
    var path_data = req.body.path_data;
    var path_qml = req.body.path_qml;
    var result = addlayer.addlayer(qgis_project_name, path_qgis, gpkg_path, geometry, identifiant, wms_type, path_logo, color, path_data, path_qml);
    res.send({ "message": result });
}
);

var httpServer = http.createServer(app);

httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
}
);
