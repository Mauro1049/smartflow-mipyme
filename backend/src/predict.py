import psycopg2
import pandas as pd
from prophet import Prophet
import json

# 🔹 conexión
conn = psycopg2.connect(
    host="localhost",
    database="smartflow_mipyme",
    user="postgres",
    password="1234"
)

# 🔹 consulta
query = "SELECT fecha, total FROM ventas ORDER BY fecha"
df = pd.read_sql(query, conn)

# 🔹 validar
if df.empty:
    print(json.dumps({"error": "No hay datos"}))
    exit()

# 🔹 agrupar por día
df = df.groupby('fecha').sum().reset_index()

# 🔹 formato prophet
df = df.rename(columns={
    "fecha": "ds",
    "total": "y"
})

# 🔹 modelo
model = Prophet()
model.fit(df)

# 🔹 predicción 7 días
future = model.make_future_dataframe(periods=7)
forecast = model.predict(future)

resultado = forecast[['ds', 'yhat']].tail(7)

# 🔥 convertir fechas a string
resultado['ds'] = resultado['ds'].astype(str)

print(json.dumps({
    "predicciones": resultado.to_dict(orient='records')
}))