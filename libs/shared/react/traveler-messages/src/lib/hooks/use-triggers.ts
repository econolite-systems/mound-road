// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/** 
 * Redux hooks used for traveler message triggers. These can be renamed or
 * moved to separate files when they are actually implemented.
 */

const propertyTriggerEvents = [
  {
    type: 'WrongWayDriver',
    name: 'Wrong Way Driver',
    statusType: 'once',
    properties: [
      {
        label: 'Wrong Way Driver',
        value: 'wrongwaydriver',
        type: 'boolean',
        defaultValue: 'True'
      }
    ]
  },
  {
    type: 'SpeedEvent',
    name: 'Speed Event',
    statusType: 'once',
    properties: [
      {
        label: 'Speed',
        value: 'speedevent',
        type: 'number',
        unit: 'mph',
        operators: ['>', '>=', '<', '<='],
        defaultValue: 0
      }
    ]
  },
  {
    type: 'EnvironmentalSensor',
    name: 'Environmental Sensor',
    statusType: 'recurring',
    entityTypes: ['ess'],
    properties: [
      {
        label: 'Temperature',
        value: 'minTemp',
        type: 'number',
        unit: 'Fahrenheit',
        defaultValue: 32
      },
      {
        label: 'Roadway Snow Depth',
        value: 'roadwaySnowDepth',
        type: 'number',
        unit: 'inches',
        defaultValue: 3
      },
      {
        label: 'Preciptation',
        value: 'precipYesNo',
        type: 'enum',
        enumType: 'ess-precip-yes-no',
        defaultValue: 'Precip'
      },
      {
        label: 'Preciptation Situation',
        value: 'precipSituation',
        type: 'enum',
        enumType: 'ess-precip-situation',
        defaultValue: 'RainModerate'
      },
      {
        label: 'Ice Thickness',
        value: 'iceThickness',
        type: 'number',
        unit: 'inches',
        defaultValue: .5
      },
    ]
  },
  {
    type: 'PavementConditionStatus',
    name: 'Pavement Condition',
    statusType: 'once',
    properties: [
      { 
        label: 'Type',
        value: 'pctype',
        type: 'enum',
        enumType: 'pc-type',
        defaultValue: 'Bump'
      },
      {
        label: 'Severity',
        value: 'pcseverity',
        type: 'enum',
        enumType: 'pc-severity',
        defaultValue: 'Medium' },
    ]
  }
];

export const usePropertyTriggerEvents = () => (
  propertyTriggerEvents
);

export const useTriggerEvents = () => ({
  events: [
    {
      entity: 'EnvironmentalSensor',
      name: 'EssStatus',
      itiscodes: [
        { label: 'Danger Of Hydroplanning (5894)', value: 'DangerOfHydroplanning'},
        { label: 'Wet Pavement (5896)', value: 'WetPavement'},
        { label: 'Ice (5906)', value: 'Ice'},
        { label: 'Snow on Roadway (5916)', value: 'SnowOnRoadway'},
      ],
      properties: [
        { display: 'Device Id', name: 'deviceId', type: 'guid', level: 'event' },
        { display: 'Timestamp', name: 'timeStamp', type: 'string', level: 'event' }, // date-time
        { display: 'Wet Bulb Temp', name: 'wetBulbTemp', type: 'number', level: 'event' },
        { display: 'Dew Point Temp', name: 'dewPointTemp', type: 'number', level: 'event' },
        { display: 'Max Temp', name: 'maxTemp', type: 'number', level: 'event' },
        { display: 'Min Temp', name: 'minTemp', type: 'number', level: 'event' },
        { display: 'Adjacent Snow Depth', name: 'adjacentSnowDepth', type: 'number', level: 'event' },
        { display: 'Roadway Snow Depth', name: 'roadwaySnowDepth', type: 'number', level: 'event' },
        { display: 'Roadway Snow Pack Depth', name: 'roadwaySnowPackDepth', type: 'number', level: 'event' },
        { display: 'Preciptation', name: 'precipYesNo', type: 'enum', level: 'event', enumType: 'ess-precip-yes-no' },
        { display: 'Preciptation Rate', name: 'precipRate', type: 'number', level: 'event' },
        { display: 'Snowfall Accumilation Rate', name: 'snowfallAccumRate', type: 'number', level: 'event' },
        { display: 'Preciptation Situation', name: 'precipSituation', type: 'enum', level: 'event', enumType: 'ess-precip-situation', },
        { display: 'Ice Thickness', name: 'iceThickness', type: 'number', level: 'event' },
        { display: 'Precipitation Start Time', name: 'precipitationStartTime', type: 'string', level: 'event' }, // date-time
        { display: 'Precipitation End Time', name: 'precipitationEndTime', type: 'string', level: 'event' }, // date-time
        { display: 'Visibility', name: 'visibility', type: 'number', level: 'event' },
        { display: 'Visibility Situation', name: 'visibilitySituation', type: 'enum', level: 'event', enumType: 'ess-visibility-situation' },
        { display: 'Total Sun', name: 'totalSun', type: 'number', level: 'event' },
        { display: 'Instantaneous Terrestrial Radiation', name: 'instantaneousTerrestrialRadiation', type: 'number', level: 'event' },
        { display: 'Instantaneous Solar Radiation', name: 'instantaneousSolarRadiation', type: 'number', level: 'event' },
        { display: 'Total Radiation', name: 'totalRadiation', type: 'number', level: 'event' },
        { display: 'Total Radiation Period', name: 'totalRadiationPeriod', type: 'number', level: 'event' },
        { display: 'Cloud Situation', name: 'cloudSituation', type: 'enum', level: 'event', enumType: 'ess-cloud-situation' },
        { display: 'Relative Humidity', name: 'relativeHumidity', type: 'number', level: 'event' },
        { display: 'Atmospheric Pressure',name: 'atmosphericPressure', type: 'number', level: 'event' },
      ]
    },
  ]
});

export const useTriggerEnums = () => ({
  enums: {
    'ess-precip-situation': [
      'Other',
      'Unknown',
      'NoPrecipitation',
      'UnidentifiedSlight',
      'UnidentifiedModerate',
      'UnidentifiedHeavy',
      'SnowSlight',
      'SnowModerate',
      'SnowHeavy',
      'RainSlight',
      'RainModerate',
      'RainHeavy',
      'FrozenPrecipitationSlight',
      'FrozenPrecipitationModerate',
      'FrozenPrecipitationHeavy',
    ],
    'ess-cloud-situation': [
      'Overcast',
      'Cloudy',
      'PartlyCloudy',
      'MostlyClear',
      'Clear',
    ],  
    'ess-visibility-situation': [
      'Other',
      'Unknown',
      'Clear',
      'FogNotPatchy',
      'PatchyFog',
      'BlowingSnow',
      'Smoke',
      'SeaSpray',
      'VehicleSpray',
      'BlowingDustOrSand',
      'SunGlare',
      'SwarmsOfInsects',
    ],
    'ess-precip-yes-no': [
      'Precip',
      'NoPrecip',
      'Error',
    ],
    'pc-type': [
      'None',
      'Bump',
      'Pothole'
    ],
    'pc-severity': [
      'Low',
      'Medium',
      'High'
    ]
  }
});

export const useTriggerEnumsOptions = () => ({
  enums: {
    'ess-precip-situation': [
      {label: 'Other', value: 'Other'},
      {label: 'Unknown', value: 'Unknown'},
      {label: 'No Precipitation', value: 'NoPrecipitation'},
      {label: 'Unidentified Slight', value: 'UnidentifiedSlight'},
      {label: 'Unidentified Moderate', value: 'UnidentifiedModerate'},
      {label: 'Unidentified Heavy', value: 'UnidentifiedHeavy'},
      {label: 'Snow Slight', value: 'SnowSlight'},
      {label: 'Snow Moderate', value: 'SnowModerate'},
      {label: 'Snow Heavy', value: 'SnowHeavy'},
      {label: 'Rain Slight', value: 'RainSlight'},
      {label: 'Rain Moderate', value: 'RainModerate'},
      {label: 'Rain Heavy', value: 'RainHeavy'},
      {label: 'Frozen Precipitation Slight', value: 'FrozenPrecipitationSlight'},
      {label: 'Frozen Precipitation Moderate', value: 'FrozenPrecipitationModerate'},
      {label: 'Frozen Precipitation Heavy', value: 'FrozenPrecipitationHeavy'},
    ],
    'ess-cloud-situation': [
      {label: 'Overcast', value: 'Overcast'},
      {label: 'Cloudy', value: 'Cloudy'},
      {label: 'Partly Cloudy', value: 'PartlyCloudy'},
      {label: 'Mostly Clear', value: 'MostlyClear'},
      {label: 'Clear', value: 'Clear'},
    ],  
    'ess-visibility-situation': [
      {label: 'Other', value: 'Other'},
      {label: 'Unknown', value: 'Unknown'},
      {label: 'Clear', value: 'Clear'},
      {label: 'Fog Not Patchy', value: 'FogNotPatchy'},
      {label: 'Patchy Fog', value: 'PatchyFog'},
      {label: 'Blowing Snow', value: 'BlowingSnow'},
      {label: 'Smoke', value: 'Smoke'},
      {label: 'Sea Spray', value: 'SeaSpray'},
      {label: 'Vehicle Spray', value: 'VehicleSpray'},
      {label: 'Blowing Dust Or Sand', value: 'BlowingDustOrSand'},
      {label: 'Sun Glare', value: 'SunGlare'},
      {label: 'Swarms Of Insects', value: 'SwarmsOfInsects'},
    ],
    'ess-precip-yes-no': [
      {label: 'Precipitation', value: 'Precip'},
      {label: 'No Precipitation', value: 'NoPrecip'},
      {label: 'Error', value: 'Error'},
    ],
    'pc-type': [
      {label: 'None', value: 'None'},
      {label: 'Bump', value: 'Bump'},
      {label: 'Pothole', value: 'Pothole'}
    ],
    'pc-severity': [
      {label: 'Low', value: 'Low'},
      {label: 'Medium', value: 'Medium'},
      {label: 'High', value: 'High'}
    ]
  }
});

// This feature is not currently supported, just defaults to Info for now
export const useTriggerTypes = () => ({
  types: ['Info']
});
