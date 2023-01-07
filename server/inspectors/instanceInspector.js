
module.exports.instanceInspector = function (inspectedObject, inspectedClass) {
        if(!(inspectedObject instanceof inspectedClass)) throw new Error(`object no match instance ${inspectedClass.constructor.name}`);
}