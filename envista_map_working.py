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
sliceStr = ["df_comm", "df_curb", "df_electric", "df_gas", "df_landUse",
          "df_paving", "df_ped", "df_roadway", "df_sewer", "df_storm",
          "df_streetScape", "df_trafficImprove", "df_transit", "df_water"]
'''
# slices = [df_comm, df_curb]
         

slices = [df_comm, df_curb, df_electric, df_gas, df_landUse,
          df_paving, df_ped, df_roadway, df_sewer, df_storm,
          df_streetScape, df_trafficImprove, df_transit, df_water]
'''
not needed, but don't want to delete yet
sliceStr = ["df_comm", "df_curb", "df_electric", "df_gas", "df_landUse",
          "df_paving", "df_ped", "df_roadway", "df_sewer", "df_storm",
          "df_streetScape", "df_trafficImprove", "df_transit", "df_water"]
'''
         
df_comm._metadata = "comm"
df_curb._metadata = "curb"
df_electric._metadata = "electric"        
df_gas._metadata = "gas"
df_landUse._metadata = "landUse"
df_paving._metadata = "paving"
df_ped._metadata = "ped"
df_roadway._metadata = "roadway"
df_sewer._metadata = "sewer"
df_storm._metadata = "storm"
df_streetScape._metadata = "streetScape"
df_trafficImprove._metadata = "trafficImprove"
df_transit._metadata = "transit"
df_water._metadata = "water"

for slice in slices:
    print(slice._metadata)
    geojson = df_2_geojson(slice, cols)
    output_filename = 'envista_' + slice._metadata + '.geojson'
    with open(output_filename, 'wb') as output_file:
        output_file.write('')
        json.dump(geojson, output_file, indent=2)
        
# %%
# Looking at timing of when things done
        
df_util.project_status.value_counts()
# %%
# slicing data up by project status
df_planned = df_util[df_util.project_status == "Planned"]
df_committed = df_util[df_util.project_status == "Committed"]
df_started = df_util[df_util.project_status == "Started"]
df_completed = df_util[df_util.project_status == "Completed"]

# %%
df_planned.dpw_project_class.value_counts()
df_committed.dpw_project_class.value_counts()
df_started.dpw_project_class.value_counts()
df_completed.dpw_project_class.value_counts()
# all completed projects are "roadway" projects


df_completed.describe() # does not work
# %%
# creating geojsons
slices2 = [df_planned, df_committed, df_started, df_completed]

df_planned._metadata = "planned"
df_committed._metadata = "committed"
df_started._metadata = "started"
df_completed._metadata = "completed"


for slice2 in slices2:
    print(slice2._metadata)
    geojson = df_2_geojson(slice2, cols)
    output_filename = 'envista_' + slice2._metadata + '.geojson'
    with open(output_filename, 'wb') as output_file:
        output_file.write('')
        json.dump(geojson, output_file, indent=2)
        