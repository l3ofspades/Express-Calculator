const express = require('express');
const fs = require('fs');
const { mean, median, mode } = require('./helpers');
const { clear } = require('console');

const app = express();

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}


function parseNums(queryNums) {
  if (!queryNums) {
    throw new ExpressError("nums are required.", 400);
  }

  let nums = queryNums.split(',').map(n => {
    let val = Number(n);
    if (isNaN(val)) {
      throw new ExpressError("Invalid input.", 400); // matches test expectation
    }
    return val;
  });

  return nums;
}

function formatResponse(req, res, data) {
  if (req.get("Accept") === "text/html") {
    return res.send(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
  }
  return res.json(data);
}

function maybeSave(result, saveFlag) {
  if (saveFlag === 'true') {
    const entry = { ...result, timestamp: new Date().toISOString() };
    fs.writeFileSync('results.json', JSON.stringify(entry, null, 2));
  }
}


app.get('/mean', (req, res, next) => {
  try {
    const nums = parseNums(req.query.nums);
    const result = { response: { operation: "mean", value: mean(nums) } };
    maybeSave(result.response, req.query.save);
    return formatResponse(req, res, result);
  } catch (err) {
    return next(err);
  }
});

// Median
app.get("/median", (req, res, next) => {
  try {
    const nums = parseNums(req.query.nums);
    const result = { response: { operation: "median", value: median(nums) } };
    maybeSave(result.response, req.query.save);
    return formatResponse(req, res, result);
  } catch (err) {
    return next(err);
  }
});

// Mode
app.get("/mode", (req, res, next) => {
  try {
    const nums = parseNums(req.query.nums);
    const result = { response: { operation: "mode", value: mode(nums) } };
    maybeSave(result.response, req.query.save);
    return formatResponse(req, res, result);
  } catch (err) {
    return next(err);
  }
});

// All
app.get("/all", (req, res, next) => {
  try {
    const nums = parseNums(req.query.nums);
    const result = {
      response: {
        operation: "all",
        mean: mean(nums),
        median: median(nums),
        mode: mode(nums),
      }
    };
    maybeSave(result.response, req.query.save);
    return formatResponse(req, res, result);
  } catch (err) {
    return next(err);
  }
});

// -----------------------------
// Error Handling Middleware
// -----------------------------
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
