# Newsroom Dojo

[![npm version](https://badge.fury.io/js/%40jerseywonder%2Fnewsroom-dojo.svg)](https://badge.fury.io/js/%40jerseywonder%2Fnewsroom-dojo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`newsroom-dojo` is a collection of utility functions designed to assist with common tasks in the newsroom. Just as a dojo equips martial artists with the tools and techniques for training, `newsroom-dojo` provides functions for wrangling data, loading data, and tackling other everyday project challenges with precision and efficiency.


## Table of Contents

- [Newsroom Dojo](#newsroom-dojo)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [Schema function](#schema-function)

## Installation

You can install the package via npm:

```bash
npm install newsroom-dojo
```

Load the specific helper functions you want to use (A full list will be coming very soon).

## Usage

```bash
import { contains, getJson } from 'newsroom-dojo/dist/index.js'
```


## API

### Schema function

Give it some json data and it generates a schema containing property names and data types. 

```bash
import { schema } from 'newsroom-dojo/dist/schema/index.js'
```

or

```bash
import { schema, getJson } from 'newsroom-dojo/dist/index.js'
```

If you are starting with a CSV you need to convert it to JSON first. In the context of converting a CSV to JSON, the JSON version of a column is typically represented as an array of values within an object where the keys are the column headers. These arrays are often referred to as "fields" or "properties" in the JSON object. Each "field" or "property" corresponds to a column in the original CSV.

```
;(async ()=>{

    try {

      // Load some json data
      let googledoc = await getJson("https://interactive.guim.co.uk/docsdata/11LFp54PIb08Cqu6fBpQGDcQ15enT2F-9HsO8kokXbfQ.json")

      // Pass your JSON to the schema function
      let info = await schema(googledoc.sheets.data)

      console.log(info)

    } catch (error) {
      console.error(error);
    }

})()

```
The schema function is meant to make generating graphics, charts and tables from your data just a little bit easier. The output of the schema function looks something like this:
```

[
    {
        "column": "Country",
        "index": 0,
        "label": "Country",
        "dataTypes": [
            "string"
        ],
        "formats": [
            {
                "type": "string",
                "format": {
                    "hasRepeat": false,
                    "longest": 9,
                    "scale": "scaleOrdinal"
                }
            }
        ]
    },
    {
        "column": "2005",
        "index": 1,
        "label": "2005",
        "dataTypes": [
            "number"
        ],
        "formats": [
            {
                "type": "number",
                "format": {
                    "min": 50.4,
                    "max": 73,
                    "scale": "scaleLinear",
                    "hasEmptyValues": false,
                    "sequential": false
                }
            }
        ]
    },
    {
        "column": "2023",
        "index": 2,
        "label": "2023",
        "dataTypes": [
            "number"
        ],
        "formats": [
            {
                "type": "number",
                "format": {
                    "min": 56.9,
                    "max": 77.4,
                    "scale": "scaleLinear",
                    "hasEmptyValues": false,
                    "sequential": false
                }
            }
        ]
    },
    {
        "column": "2024",
        "index": 3,
        "label": "2024",
        "dataTypes": [
            "number"
        ],
        "formats": [
            {
                "type": "number",
                "format": {
                    "min": 50.4,
                    "max": 73,
                    "scale": "scaleLinear",
                    "hasEmptyValues": false,
                    "sequential": false
                }
            }
        ]
    },
    {
        "column": "2025",
        "index": 4,
        "label": "2025",
        "dataTypes": [
            "number"
        ],
        "formats": [
            {
                "type": "number",
                "format": {
                    "min": 56.9,
                    "max": 77.4,
                    "scale": "scaleLinear",
                    "hasEmptyValues": false,
                    "sequential": false
                }
            }
        ]
    }
]
```

