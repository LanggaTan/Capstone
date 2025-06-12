from flask import Flask, request, jsonify, render_template
from keras.models import load_model
from ultralytics import YOLO
from flask_cors import CORS
from collections import Counter
from PIL import Image
import numpy as np
import pandas as pd
import openpyxl
import os
import cv2

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}})

# Load YOLOv8 model and dataframe
od_model = YOLO("static/model/od.pt")
ic_model = load_model("static/model/model.keras")

# dataframe
df_nut = pd.read_excel("nutrition_clean.xlsx", sheet_name='hamburger')
numeric_column = ['Air (Water) (g)', 'Energi (Energy) (Kal)',
       'Protein (Protein) (g)', 'Lemak (Fat) (g)', 'Karbohidrat (CHO) (g)',
       'Abu (ASH) (g)', 'Kalsium (Ca) (mg)', 'Fosfor (P) (mg)',
       'Besi (Fe) (mg)', 'Natrium (Na) (mg)', 'Kalium (K) (mg)',
       'Tembaga (Cu) (mg)', 'Seng (Zn) (mg)', 'Riboflavin (Vit B2) (mg)',
       'Niasin (Vit B3) (mg)', 'Serat (Fibre) (g)', 'Retinol (Vit A) (mcg)',
       'Beta-Karoten (Carotenes) (mcg)', 'Karoten Total (Re) (mcg)',
       'Thiamin (Vit B1) (mg)', 'Vitamin C (Vit C) (mg)', 'gram']

ic_map = {
    0: 'Ayam_Geprek',
    1: 'Nasi Kuning',
    2: 'Pecel_Lele',
    3: 'Tahu_Goreng',
    4: 'Tempe_Goreng',
    5: 'ayam_goreng',
    6: 'ayam_pop',
    7: 'gado_gado',
    8: 'gudeg',
    9: 'hamburger',
    10: 'nasi_goreng',
    11: 'steak',
    12: 'telur_balado',
    13: 'telur_dadar'
}

# Extension validator
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Image Preprocess
def preprocess(image_path):
    img = Image.open(image_path).convert('RGB')
    img = img.resize((200,200))
    img_array = np.array(img).astype('float32') / 255.0  # Normalize to [0,1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

# Predict endpoint
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'})
    
    file_path = os.path.join('static/uploads', file.filename)
    output_path = os.path.join('static/output', file.filename)
    file.save(file_path)

    results = od_model(file_path)
    detected_objects = []

    for result in results:
        result.save(output_path)
        boxes = result.boxes
        for box in boxes:
            class_id = box.cls[0].item()
            detected_objects.append(result.names.get(class_id))

    value_count = dict(Counter(detected_objects))

    # Resize image for display
    image = cv2.imread(output_path)
    resized_image = cv2.resize(image, (640, 640))
    cv2.imwrite(output_path, resized_image)

    # make the nutrition value of each food component
    df_new = pd.DataFrame()
    for key, value in value_count.items():
        df_new = pd.concat([df_new, df_nut[df_nut["Nama Makanan"]==key]], ignore_index=True)
        df_new.loc[df_new["Nama Makanan"]==key, numeric_column] *= value
        df_new.loc[df_new['Nama Makanan']==key, "Nama Makanan"] = f"{key} x{value}"
    ## nutrition dictionary
    nut_dict = df_new.set_index('Nama Makanan').to_dict(orient='index')

    ## image classification predict
    ic_image = preprocess(file_path)
    prediction = ic_model.predict(ic_image)
    prediction_label = ic_map[np.argmax(prediction)]

    return jsonify({
        'image_url': f"/{output_path}",
        'detected_objects': value_count,
        'nut_dict' : nut_dict,
        'food_names' : prediction_label
    })

if __name__ == "__main__":
    app.run(debug=True)