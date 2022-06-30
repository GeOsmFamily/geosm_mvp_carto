var { PythonShell } = require('python-shell');

module.exports = {
    addlayer
}

function addlayer(qgis_project_name, path_qgis, gpkg_path, geometry, identifiant, wms_type, path_logo = null, color = null, path_data = null, path_qml = null) {
    var option;
    var results;

    if (wms_type == 'osm') {
        if (geometry == 'point') {
            option = {
                mode: 'text',
                pythonPath: 'python3',
                args: [qgis_project_name, path_qgis, gpkg_path, 'point', identifiant, path_logo, color]
            };
        } else {
            option = {
                mode: 'text',
                pythonPath: 'python3',
                args: [qgis_project_name, path_qgis, gpkg_path, geometry, identifiant, path_qml]
            };
        }

        PythonShell.run('./scripts/add_layer.py', option, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        });
    } else {
        if (geometry == 'point') {
            option = {
                mode: 'text',
                pythonPath: 'python3',
                args: [qgis_project_name, path_qgis, path_data, 'point', identifiant, path_logo, color]
            };
        } else {
            option = {
                mode: 'text',
                pythonPath: 'python3',
                args: [qgis_project_name, path_qgis, path_data, geometry, identifiant, path_qml]
            };

            PythonShell.run('./scripts/add_layer.py', option, function (err, results) {
                if (err) {
                    results = err;
                    console.log(results);
                } else {
                    results = results;
                    console.log(results);
                }
            });

        }


    }

    return results;
}

