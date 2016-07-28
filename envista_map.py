# -*- coding: utf-8 -*-
"""
Created on Tue Jul 26 20:13:50 2016

@author: Holly
"""
import datetime
import requests
import json
#import sqlite3 as lite
import pandas as pd
import numpy as np
import seaborn as sns

url_util = ('https://data.sfgov.org/resource/dsie-4zfb.json')
    
r_util = requests.get(url_util)
response_dict_util = json.loads(r_util.text)

df_util = pd.DataFrame.from_dict(response_dict_util)
df_util = df_util.drop(df_util.columns[[0, 1, 2, 3, 4]], axis=1)

url = ('https://data.sfgov.org/resource/vad7-rtjc.json')
    
r = requests.get(url)
response_dict = json.loads(r.text)

df = pd.DataFrame.from_dict(response_dict)
df = df.drop(df.columns[[0, 1, 2, 3, 4]], axis=1)

# Turn into a geojson object

# %%
dfj = pd.DataFrame(np.random.randn(5, 2), columns=list('AB'))
json = dfj.to_json()
json

# %%
def df_to_geojson(df, properties, lat='latitude', lon='longitude'):
    geojson = {'type':'FeatureCollection', 'features':[]}
    for _, row in df.iterrows():
        feature = {'type':'Feature',
                   'properties':{},
                   'geometry':{'type':'Point',
                               'coordinates':[]}}
        feature['geometry']['coordinates'] = [row[lon],row[lat]]
        for prop in properties:
            feature['properties'][prop] = row[prop]
        geojson['features'].append(feature)
    return geojson
    
    

cols = ['street_address', 'issue_type', 'status']
geojson = df_to_geojson(df, cols)

output_filename = 'dataset.js'
with open(output_filename, 'wb') as output_file:
    output_file.write('var dataset = ')
    json.dump(geojson, output_file, indent=2) 
    
# %%
def df_2_geojson(df, properties, lat='latitude', lon='longitude'):
    geojson = {"type":"FeatureCollection", "features":[]}
    for _, row in df.iterrows():
        feature = {"type":"Feature",
                   "geometry":{"type":"Point",
                               "coordinates":[]},
                   "properties":{}}
        feature["geometry"]["coordinates"] = [row[lon],row[lat]]
        for prop in properties:
            feature["properties"][prop] = row[prop]
        geojson['features'].append(feature)
    return geojson
    
    
    
cols = ["project_id", "owner", "dpw_project_class", "project_status", "start_date", "end_date"]
geojson = df_2_geojson(df, cols)
# %%
output_filename = 'envista.js'
with open(output_filename, 'wb') as output_file:
    output_file.write('var dataset = ')
    json.dump(geojson, output_file, indent=2) 
    
    # %%
def df_2_geojson(df, properties, lat='latitude', lon='longitude'):
    geojson = {"type":"FeatureCollection", "features":[]}
    for _, row in df.iterrows():
        feature = {"type":"Feature",
                   "properties":{},
                   "geometry":{"type":"Point",
                               "coordinates":[]}}
        feature["geometry"]["coordinates"] = [row[lon],row[lat]]
        for prop in properties:
            feature["properties"][prop] = row[prop]
        geojson['features'].append(feature)
    return geojson
    
    
    
cols = ["project_id", "owner", "dpw_project_class", "project_status", "start_date", "end_date"]
geojson = df_2_geojson(df, cols)

output_filename = 'envista3.geojson'
with open(output_filename, 'wb') as output_file:
    output_file.write('')
    json.dump(geojson, output_file, indent=2) 