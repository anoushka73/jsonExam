const jsonData = {
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4", "value": "213" }
};

// Step 1: Extract keys 'n' and 'k'
const n = jsonData.keys.n;
const k = jsonData.keys.k;

// Step 2: Extract first k points (x, y)
const xValues = [];
const yValues = [];

Object.keys(jsonData).forEach((key) => {
    if (key === "keys") return;
    if (xValues.length < k) {
        let x = parseInt(key); 
        let base = parseInt(jsonData[key].base);
        let y = parseInt(jsonData[key].value, base); // Convert from given base

        xValues.push(x);
        yValues.push(y);
    }
});

// Step 3: Compute the constant term using Lagrange Interpolation
function lagrangeInterpolation(x, y, xTarget) {
    let result = 0;
    for (let i = 0; i < x.length; i++) {
        let term = y[i];
        for (let j = 0; j < x.length; j++) {
            if (i !== j) {
                term *= (xTarget - x[j]) / (x[i] - x[j]);
            }
        }
        result += term;
    }
    return Math.round(result); // Ensure integer result
}

// Step 4: Get the secret constant (c) at x = 0
const secret = lagrangeInterpolation(xValues, yValues, 0);
console.log("Secret constant (c):", secret);
