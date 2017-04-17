#include <vector>
#include <aivlib/meshTD.hpp>
using namespace aiv;

const int D = 2;

double U(const indx<D> &p){ return p*p*.5; }

int main(int argc, const char ** argv){
  double T = atof(argv[1]); 
  int N = atoi(argv[2]);
  int t_max = atoi(argv[3]);
  mesh<float, D> df; df.init(indx<D>(21));
  df.min = -vctr<D>(10.);
  df.max =  vctr<D>(10.);
  df.step = (df.max-df.min)/df.N;
  
  
  std::vector<indx<D> > particles(N);
	double disp;
    for(int t=0; t<t_max; t++){
	disp = 0;
	df = 0.f;
	for(auto I=particles.begin(); I!=particles.end(); ++I){
	    indx<D> &pos = *I;
	    double p[D*2+1];
	    double u[D*2+1];
	    indx<D> dnb [D*2 + 1];
	    dnb[0] = pos;
	    for (int i=0; i<D; i++){
	      dnb[1+2*i]=pos;
	      dnb[1+2*i+1]=pos;
	      dnb[1+2*i][i]++;
	      dnb[1+2*i+1][i]--; 
	    }

	    double sump=0;
	    for(int i=0; i<2*D+1;i++){
		u[i]=U(dnb[i]);
		p[i] = exp(-u[i]/(T*D));
		sump+=p[i];
	    }

	    double ksi = sump*random()/(RAND_MAX+1.);
	    sump=0;
	    for(int i=0; i<2*D+1; i++){
	      sump+=p[i];
	      if(ksi<sump || i==2*D) {
		pos = dnb[i];

		break;
	      }
	    }

	    disp += pos*pos;
	    df[pos*vctr<D>(1.)] += 1.;
	}

    }
    printf("%lf %lf\n", T, disp/N);
  
}