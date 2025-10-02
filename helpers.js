function mean(nums) {
    let sum = nums.reduce((a, b) => a + b, 0);
    return sum / nums.length;
}

function median(nums) {
    nums.sort((a, b) => a - b);
    let mid = Math.floor(nums.length / 2);
    if (nums.length % 2 === 0) {
        return (nums[mid - 1] + nums[mid]) / 2;
    } else {
        return nums[mid];
    }   
}

function mode(nums) {
    let frequency = {};
    let maxFreq = 0;
    let modeVal;

    for (let num of nums) {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
            modeVal = num;
        }
    }

    return modeVal;
}

module.exports = { mean, median, mode };