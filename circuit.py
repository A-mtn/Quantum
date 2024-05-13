from qiskit import QuantumRegister, ClassicalRegister, QuantumCircuit, transpile
from qiskit.circuit import Parameter
import numpy as np
from qiskit.providers.basic_provider import BasicProvider


qr = QuantumRegister(6)
cr = ClassicalRegister(6)

source_circ = QuantumCircuit(qr, cr)

source_circ.h(qr[0])
source_circ.h(qr[1])
source_circ.h(qr[2])
source_circ.h(qr[3])
source_circ.h(qr[4])
source_circ.h(qr[5])

source_circ.measure(0, 0)
source_circ.measure(1, 1)
source_circ.measure(2, 2)
source_circ.measure(3, 3)
source_circ.measure(4, 4)
source_circ.measure(5, 5)

from qiskit.providers.basic_provider import BasicSimulator
backend = BasicSimulator()
tqc = transpile(source_circ, backend)
counts = backend.run(tqc).result().get_counts()
 
#print(counts)


import json

print(json.dumps(counts))