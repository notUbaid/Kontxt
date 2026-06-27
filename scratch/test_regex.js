const content = `- [x] A precise problem statement`;
let lines = content.split('\n');
lines[0] = lines[0].replace(/\[x\]/i, '[ ]');
console.log(lines[0]);

const content2 = `- [X] A precise problem statement`;
let lines2 = content2.split('\n');
lines2[0] = lines2[0].replace(/\[x\]/i, '[ ]');
console.log(lines2[0]);
