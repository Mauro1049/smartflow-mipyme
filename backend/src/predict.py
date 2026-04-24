import psycopg2
import pandas as pd
from prophet import Prophet
import json

conn = psycopg2.connect(
    host="localhost",
    database="smartflow_mipyme",
    user="postgres",
    password="1234"
)

query = "SELECT fecha, total FROM ventas ORDER BY fecha"
df = pd.read_sql(query, conn)

if df.empty:
    print(json.dumps({"error": "No hay datos"}))
    exit()

df = df.groupby('fecha').sum().reset_index()

df = df.rename(columns={
    "fecha": "ds",
    "total": "y"
})

model = Prophet()
model.fit(df)

future = model.make_future_dataframe(periods=7)
forecast = model.predict(future)

resultado = forecast[['ds', 'yhat']].tail(7)

resultado['ds'] = resultado['ds'].astype(str)

print(json.dumps({
    "predicciones": resultado.to_dict(orient='records')
}))