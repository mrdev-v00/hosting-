const FULL_SOLUTIONS = {
1: {
topic: "Complex Numbers",

short: "x²−4x+5=(x−2)²+1=(x−2−i)(x−2+i)",

detailed: `
x² − 4x + 5 = 0

Complete the square:

x² − 4x + 4 + 1 = 0
(x − 2)² + 1 = 0

(x − 2)² = −1

x − 2 = ± i

x = 2 ± i

Therefore,
Factors = (x − 2 − i)(x − 2 + i)
`
},

2: {
topic: "Matrices",

short: "x = −5, y = 5, z = 10",

detailed: `
Given:

x + 2y = 5
x − z = −15
−x + 3y + 2z = 40

From (2):
z = x + 15

Substitute in (3):

−x + 3y + 2(x+15) = 40

−x + 3y + 2x + 30 = 40

x + 3y = 10  ...(4)

Now solve with (1)

x + 2y = 5
x + 3y = 10

Subtract:

y = 5

Substitute back:

x + 2(5) = 5
x = −5

z = x + 15 = 10

Final:
x = −5
y = 5
z = 10
`
}
};
