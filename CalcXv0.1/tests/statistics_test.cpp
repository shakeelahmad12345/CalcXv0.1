#include "../src/statistics.h"
#include <cassert>
#include <cmath>
#include <iostream>
bool close(double a,double b){return std::abs(a-b)<1e-9;}
int main(){using namespace calcx::statistics;auto d=describe({1,2,3,4,5});assert(d.count==5&&close(d.mean,3)&&close(d.median,3)&&close(d.populationVariance,2)&&close(d.sampleVariance,2.5)&&d.modes.empty());auto m=describe({1,2,2,3,4});assert(m.modes.size()==1&&close(m.modes[0],2));assert(close(probability(3,10),.3)&&close(complement(.3),.7));assert(close(permutations(5,2),20)&&close(combinations(5,2),10));auto r=regress({1,2,3,4,5},{2,4,6,8,10});assert(close(r.slope,2)&&close(r.intercept,0)&&close(r.r,1)&&close(r.rSquared,1)&&close(r.sse,0));bool failed=false;try{correlation({1,1},{2,3});}catch(...){failed=true;}assert(failed);std::cout<<"statistics tests: PASS\n";}
