import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import sys

d1 = float(sys.argv[1])
d2 = float(sys.argv[2])
d3 = float(sys.argv[3])
d4 = float(sys.argv[4])

pndf = pd.DataFrame([d1, d2, d3, d4])
nparr = pndf.values
nparr.astype('float32')
print(nparr)


# normalization
scaler = MinMaxScaler(feature_range=(0, 1))
nptf = scaler.fit_transform(nparr)


from keras.models import load_model
model = load_model('day4learn_model.h5')

# predict last value (or tomorrow?)
lastX = nptf
lastX = np.reshape(lastX, (1, 4, 1))
lastY = model.predict(lastX)
lastY = scaler.inverse_transform(lastY)
print(lastY)