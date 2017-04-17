#include "Model.hpp" 

double Model::calc(double x_0, double v_0, int t_max){
  double t1 = 10/gamma;
  double t2 = t1 + 80*M_PI/omega;
  double t = 0;
  double v=v_0;
  double x = x_0;
  double sum1 = 0;
  double sum2 = 0;
  double f_12 = 0;
  double f_22 = 0;
  double x1 = 0;
   while(t<t1){
    x1=x+delta_t*v*0.5;
    v = v-gamma*v*delta_t-x1*delta_t+a*sin(omega*(t+delta_t*0.5))*delta_t;
    x=x1+delta_t*v*.5;
    t=t+delta_t;
   }
   double f_11= sin(omega*t)*x;
   double f_21 = cos(omega*t)*x;
   double t_1 = t;
   double time_1 = t;
   double t_2 = 0;
   while(t<=t2){
    x1=x+delta_t*v*0.5;
    v = v-gamma*v*delta_t-x1*delta_t+a*sin(omega*(t+delta_t*0.5))*delta_t;
    x=x1+delta_t*v*.5;
    t=t+delta_t;
    t_2 = t;
    f_12= sin(omega*t_2)*x;
    sum1 += (f_12+f_11)*(t_2-t_1)*.5;
    f_22= cos(omega*t_2)*x;
    sum2 += (f_22+f_21)*(t_2-t_1)*.5;
    f_11 = f_12;
    f_21 = f_22;
    t_1 = t_2;
   }
  double time_2=t_2;
  double I = 2/(a*(time_2-time_1))*sqrt(sum1*sum1+sum2*sum2);
  return I;
}
