#!/usr/bin/python
from math import *
from Model import *
M = Model()
M.a = 0.1
M.gamma = 0.1
M.omega = 0.1
M.I = 0
Ifail = open('I.dat', 'w')
print>>Ifail, '#:omega gamma I'
M.delta_t = 0.01*(2*pi/M.omega)
if 0.01*(2*pi) < M.delta_t:
  M.delta_t = 0.01*(2*pi)
while M.omega < 2:
  M.gamma = 0.1
  while M.gamma < 2:
    M.I = M.calc(0,0,100)
    print>>Ifail, M.omega, M.gamma, M.I 
    Ifail.flush()
    M.gamma+=0.1
  print>>Ifail, ''
  M.omega+=0.1