const FULL_SOLUTIONS = {
  1:{
    short:"(x−2−i)(x−2+i)",
    detailed:
`x² − 4x + 5
= x² − 4x + 4 + 1
= (x−2)² + 1
= (x−2)² − (i)²
= (x−2−i)(x−2+i)`
  },

  2:{
    short:"x = −5, y = 5, z = 10",
    detailed:
`x + 2y = 5
x − z = −15
−x + 3y + 2z = 40

From (2): z = x + 15

Substitute into (3):
−x + 3y + 2(x+15) = 40
−x + 3y + 2x + 30 = 40
x + 3y = 10

Solve with (1):
x + 2y = 5
x + 3y = 10

Subtract:
y = 5

x = 5 − 2(5) = −5

z = x + 15 = 10`
  },

  3:{
    short:"≈ 121,899",
    detailed:
`P = 100000
r = 2% = 0.02
n = 10

Population = P(1+r)^n
= 100000(1.02)^10
≈ 121,899`
  },

  4:{
    short:"ab = 4(a+b)",
    detailed:
`HM = 2ab/(a+b)

Given HM = 8

8 = 2ab/(a+b)

Multiply:

8(a+b) = 2ab

4(a+b) = ab`
  },

  5:{
    short:"x = (−3+√41)/2",
    detailed:
`x² + 3x − 8 = 0

Using quadratic formula:

x = [−3 ± √(9 + 32)]/2
x = [−3 ± √41]/2

Positive root:

x = (−3 + √41)/2`
  }
};
