#include <stdio.h>
#include <stdlib.h>
#include <math.h>

struct Model{
  double a;
  double omega;
  double gamma;
  double delta_t;
  double I;
  double calc(double x_0, double v_0, int t_max);
};
