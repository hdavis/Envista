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

# %%  
# Turn into a geojson object
    
dfj = pd.DataFrame(np.random.randn(5, 2), columns=list('AB'))
json = dfj.to_json()
json

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

output_filename = 'envista.geojson'
with open(output_filename, 'wb') as output_file:
    output_file.write('')
    json.dump(geojson, output_file, indent=2) 
    
# %%
# compare two dataframes to see if there are duplicate records
# From visual inspection, it seems that df (the plain Envista database - 4938 records) is a subset of the Utility and paving database (df_util) which has many more records (15723)
# For now move forward with df_util and confirm that everything in the smaller database is in the larger database.
# %%
# find all the different values for dpw_project_class so can slice the dataframe on this field
df_util.dpw_project_class.value_counts()

# subset dataframe based on value in dpw_project_class field 
df_comm = df_util[df_util.dpw_project_class == 'Communication']
df_curb = df_util[df_util.dpw_project_class == 'Curb Ramps']
df_electric = df_util[df_util.dpw_project_class == 'Electric']
df_gas = df_util[df_util.dpw_project_class == 'Gas']
df_landUse = df_util[df_util.dpw_project_class == 'Land-Use']
df_paving = df_util[df_util.dpw_project_class == 'Paving']
df_ped = df_util[df_util.dpw_project_class == 'Pedestrian Safety']
df_roadway = df_util[df_util.dpw_project_class == 'Roadway']
df_sewer = df_util[df_util.dpw_project_class == 'Sewer']
df_storm = df_util[df_util.dpw_project_class == 'Storm Drain']
df_streetScape = df_util[df_util.dpw_project_class == 'StreetScape']
df_trafficImprove = df_util[df_util.dpw_project_class == 'Traffic Improvement']
df_transit = df_util[df_util.dpw_project_class == 'Transit']
df_water = df_util[df_util.dpw_project_class == 'Water']


# Check that number of rows in each subset adds up to total rows
# df_util.shape[0] - another option for counting rows, not as fast as len(df_util.index)

numRows_df_util = len(df_util.index)
numRows_df_util

numRows_all_slices = len(df_comm.index) + len(df_curb.index) + \
    len(df_electric.index) + len(df_gas.index) + len(df_landUse.index) + \
    len(df_paving.index) + len(df_ped.index) + len(df_roadway.index) + \
    len(df_sewer.index) + len(df_storm.index) + len(df_streetScape.index) + \
    len(df_trafficImprove.index) + len(df_transit.index) + len(df_water.index)
numRows_all_slices    
    
    
# %%  
# Turn into a geojson object

# %%
# already have following function defined above...

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

'''
slices = ["df_comm", "df_curb", "df_electric", "df_gas", "df_landUse",
          "df_paving", "df_ped", "df_roadway", "df_sewer", "df_storm",
          "df_streetScape", "df_trafficImprove", "df_transit", "df_water"]
'''
# %%
slices = [df_comm, df_curb, df_electric, df_gas, df_landUse,
          df_paving, df_ped, df_roadway, df_sewer, df_storm,
          df_streetScape, df_trafficImprove, df_transit, df_water]
# %%
for slice in slices:
    geojson = df_2_geojson(slice, cols)
    output_filename = 'envista_' + str(slice) + '.geojson'
    with open(output_filename, 'wb') as output_file:
        output_file.write('')
        json.dump(geojson, output_file, indent=2)
