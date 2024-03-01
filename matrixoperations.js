function multiplyMatrix(mat1, mat2) {
    let result = [];
    for (let i = 0; i < 4; i++) {
        result[i] = [];
        for (let j = 0; j < 4; j++) {
            result[i][j] = 0;
            for (let k = 0; k < 4; k++) {
                result[i][j] += mat1[i][k] * mat2[k][j];
            }
        }
    }
    return result;
}

// Helper function to perform row reduction
function rowReduction(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    let lead = 0;
    for (let r = 0; r < m; r++) {
        if (lead >= n) {
            return;
        }

        let i = r;
        while (matrix[i][lead] === 0) {
            i++;
            if (i === m) {
                i = r;
                lead++;
                if (n === lead) {
                    return;
                }
            }
        }

        // Swap rows i and r
        let temp = matrix[i];
        matrix[i] = matrix[r];
        matrix[r] = temp;

        // Scale row r to have a lead of 1
        const scale = matrix[r][lead];
        for (let j = 0; j < n; j++) {
            matrix[r][j] /= scale;
        }

        // Eliminate other rows' lead
        for (let k = 0; k < m; k++) {
            if (k !== r) {
                const factor = matrix[k][lead];
                for (let j = 0; j < n; j++) {
                    matrix[k][j] -= factor * matrix[r][j];
                }
            }
        }

        lead++;
    }
}

// Calculate the rank of a matrix
function calculateRank(matrix) {
    const clonedMatrix = matrix.map(row => [...row]);
    rowReduction(clonedMatrix);

    let rank = 0;
    for (let i = 0; i < clonedMatrix.length; i++) {
        for (let j = 0; j < clonedMatrix[0].length; j++) {
            if (clonedMatrix[i][j] !== 0) {
                rank++;
                break;
            }
        }
    }

    return rank;
}

// Helper function to normalize a vector
function normalizeVector(v) {
    const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return [v[0] / length, v[1] / length, v[2] / length];
}

// Helper function to calculate cross product of two vectors
function crossProduct(v1, v2) {
    return [
        v1[1] * v2[2] - v1[2] * v2[1],
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v1[1] * v2[0]
    ];
}

// Create a view matrix
function createViewMatrix(eye, center, up) {
    const zAxis = normalizeVector([
        center[0] - eye[0],
        center[1] - eye[1],
        center[2] - eye[2]
    ]);

    const xAxis = normalizeVector(crossProduct(up, zAxis));

    const yAxis = crossProduct(zAxis, xAxis);

    const viewMatrix = [
        [xAxis[0], yAxis[0], zAxis[0], 0],
        [xAxis[1], yAxis[1], zAxis[1], 0],
        [xAxis[2], yAxis[2], zAxis[2], 0],
        [-dotProduct(xAxis, eye), -dotProduct(yAxis, eye), -dotProduct(zAxis, eye), 1]
    ];

    return viewMatrix;
}

// Helper function to calculate dot product of two vectors
function dotProduct(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

function createPerspectiveProjectionMatrix(fov, aspect, near, far) {
    const f = 1.0 / Math.tan(fov / 2);
    const rangeInv = 1.0 / (near - far);

    const perspectiveMatrix = [
        [f / aspect, 0, 0, 0],
        [0, f, 0, 0],
        [0, 0, (near + far) * rangeInv, -1],
        [0, 0, near * far * rangeInv * 2, 0]
    ];

    return perspectiveMatrix;
}

module.exports = {
    multiplyMatrix,
    calculateRank,
    createViewMatrix,
    createPerspectiveProjectionMatrix
};
