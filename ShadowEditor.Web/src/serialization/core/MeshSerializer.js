import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from './Object3DSerializer';

import GeometriesSerializer from '../geometry/GeometriesSerializer';
import MaterialsSerializer from '../material/MaterialsSerializer';

/**
 * Mesh序列化器
 */
function MeshSerializer() {
    BaseSerializer.call(this);
}

MeshSerializer.prototype = Object.create(BaseSerializer.prototype);
MeshSerializer.prototype.constructor = MeshSerializer;

MeshSerializer.prototype.toJSON = function (obj) {
    var json = Object3DSerializer.prototype.toJSON.call(this, obj);

    json.drawMode = obj.drawMode;
    json.geometry = (new GeometriesSerializer()).toJSON(obj.geometry);
    json.material = (new MaterialsSerializer()).toJSON(obj.material);

    return json;
};

MeshSerializer.prototype.fromJSON = function (json, parent) {
    var geometry, material;

    if (parent === undefined) {
        if (json.geometry == null) {
            console.warn(`MeshSerializer: ${json.name} json.geometry未定义。`);
            return null;
        }
        if (json.material == null) {
            console.warn(`MeshSerializer: ${json.name} json.material未定义。`);
            return null;
        }
        geometry = (new GeometriesSerializer()).fromJSON(json.geometry);
        material = (new MaterialsSerializer()).fromJSON(json.material);
    }

    var obj = parent === undefined ? new THREE.Mesh(geometry, material) : parent;

    Object3DSerializer.prototype.fromJSON.call(this, json, obj);

    return obj;
};

export default MeshSerializer;