const { mat4, vec3 } = require('gl-matrix');

import * as THREE from 'three';

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

// Function to pad a matrix with zeros
function padMatrix(matrix, padding) {
    const paddedMatrix = [];
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let i = 0; i < rows + 2 * padding; i++) {
        paddedMatrix[i] = [];
        for (let j = 0; j < cols + 2 * padding; j++) {
            if (i < padding || i >= rows + padding || j < padding || j >= cols + padding) {
                paddedMatrix[i][j] = 0;
            } else {
                paddedMatrix[i][j] = matrix[i - padding][j - padding];
            }
        }
    }

    return paddedMatrix;
}

// Function to perform convolution multiplication using gl-matrix
function convolveMatrix(matrix, kernel) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const kernelSize = kernel.length;

    const resultMatrix = mat4.create();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const sum = mat4.create();
            for (let ki = 0; ki < kernelSize; ki++) {
                for (let kj = 0; kj < kernelSize; kj++) {
                    const value = mat4.create();
                    mat4.scale(value, matrix[i + ki][j + kj], kernel[ki][kj]);
                    mat4.add(sum, sum, value);
                }
            }
            resultMatrix[i][j] = sum;
        }
    }

    return resultMatrix;
}

module.exports = {
    createViewMatrix,
    createPerspectiveProjectionMatrix
};