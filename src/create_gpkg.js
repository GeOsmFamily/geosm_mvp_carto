const fs = require('fs');
let bd_param = JSON.parse(fs.readFileSync('env.json'))['database'];
let bd_osm_param = JSON.parse(fs.readFileSync('env.json'))['database_osm'];
let qgis = JSON.parse(fs.readFileSync('env.json'))['qgis'];

var ogr2ogr = require('ogr2ogr');

function executeOgr2Ogr(sql, instance, thematique_name, thematique_id) {
    var save_path = qgis['path'] + '/' + instance + '/' + thematique_name + thematique_id + '.gpkg';
    var gpkg = ogr2ogr('PG:host=' + bd_osm_param['host'] + ' port=' + bd_osm_param['port'] + ' dbname=' + bd_osm_param['dbname'] + ' user=' + bd_osm_param['user'] + ' password=' + bd_osm_param['password'])
        .format('GPKG')
        .options(["--config", "CPL_DEBUG", "ON", "-sql", sql])
        .project('EPSG:4326')
        .timeout(1800000)
        .onStderr(function (data) {
            console.log(data.toString());
        }
        )
        .skipfailures()
        .destination(save_path)
        .exec();

    return save_path;
}

module.exports = {
    executeOgr2Ogr
}
