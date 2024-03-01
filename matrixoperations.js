const { mat4, vec3 } = require('gl-matrix');

// Helper function to normalize a vector
function normalizeVector(v) {
    return vec3.normalize(vec3.create(), v);
}

// Helper function to calculate cross product of two vectors
function crossProduct(v1, v2) {
    return vec3.cross(vec3.create(), v1, v2);
}

// Create a view matrix
function createViewMatrix(eye, center, up) {
    const viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, eye, center, up);
    return viewMatrix;
}

// Create a perspective projection matrix
function createPerspectiveProjectionMatrix(fov, aspect, near, far) {
    const perspectiveMatrix = mat4.create();
    mat4.perspective(perspectiveMatrix, fov, aspect, near, far);
    return perspectiveMatrix;
}

module.exports = {
    createViewMatrix,
    createPerspectiveProjectionMatrix
};