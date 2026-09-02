#include "../src/matrix.h"
#include <cassert>
#include <cmath>
#include <iostream>
bool close(double a,double b){return std::abs(a-b)<1e-9;}
int main(){using namespace calcx::linear;Matrix a(2,2),b(2,2);a.at(0,0)=1;a.at(0,1)=2;a.at(1,0)=3;a.at(1,1)=4;b.at(0,0)=5;b.at(0,1)=6;b.at(1,0)=7;b.at(1,1)=8;assert(close(add(a,b).at(1,1),12));assert(close(subtract(a,b).at(0,0),-4));assert(close(multiply(a,b).at(0,0),19));assert(close(determinant(a),-2));Matrix inv=inverse(a);assert(close(inv.at(0,0),-2)&&close(inv.at(1,0),1.5));assert(rank(a)==2);Matrix dependent(2,2);dependent.at(0,0)=1;dependent.at(0,1)=2;dependent.at(1,0)=2;dependent.at(1,1)=4;assert(rank(dependent)==1);auto x=solve(a,{5,1});assert(close(x[0],2)&&close(x[1],1));auto eigen=eigenvalues2x2(Matrix(2,2));assert(eigen.size()==2);bool failed=false;try{inverse(dependent);}catch(...){failed=true;}assert(failed);std::cout<<"matrix tests: PASS\n";}
