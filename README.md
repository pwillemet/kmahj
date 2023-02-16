# KMAHJ.JS

Parse mahjong inputs and resolve hand scores for various rule sets.

## Installation
`npm i kmahj`

## Usage

__Resolve majong hand from input__
```
import { kmahj } from "kmahj";

const input = "12345689p12344s+7p";
kmahj.ema2016.resolve(input);
```

Result
```
{
  "groups": [...]
  "han": 2,
  "yakuman": 0,
  "fu": 40,
  "yaku": [
    {
      "name": "Ittsu",
      "yakuman": false,
      "han": 1,
      "concealedMajoration": true
    }
  ],
  "score": {
    "east": 3900,
    "other": {
      "ron": 2600,
      "tsumo": {
        "other": 700,
        "east": 1300
      }
    }
  }
}
```

__Parse tiles__
```
import { MpszParser } from "kmahj/parser";

const input = "456p 1>23p 345*>p 6v666vp 0>55m 6>6^66s";
const parsed = MpszParser(input);
```

Result
```
{
  "groups": [
    {
      "tiles": [
        {
          "tile": {
            "code": 4,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        },
        {
          "tile": {
            "code": 5,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        },
        {
          "tile": {
            "code": 6,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        }
      ]
    },
    {
      "tiles": [
        {
          "tile": {
            "code": 1,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": [
            "inclined"
          ]
        },
        {
          "tile": {
            "code": 2,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        },
        {
          "tile": {
            "code": 3,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        }
      ]
    },
    {
      "tiles": [
        {
          "tile": {
            "code": 3,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        },
        {
          "tile": {
            "code": 4,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        },
        {
          "tile": {
            "code": 5,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": [
            "aka",
            "inclined"
          ]
        }
      ]
    },
    {
      "tiles": [
        {
          "tile": {
            "code": 6,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": [
            "reverted"
          ]
        },
        {
          "tile": {
            "code": 6,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        },
        {
          "tile": {
            "code": 6,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        },
        {
          "tile": {
            "code": 6,
            "family": {
              "code": "pin",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": [
            "reverted"
          ]
        }
      ]
    },
    {
      "tiles": [
        {
          "tile": {
            "code": 25,
            "family": {
              "code": "man",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": [
            "aka",
            "inclined"
          ]
        },
        {
          "tile": {
            "code": 25,
            "family": {
              "code": "man",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        },
        {
          "tile": {
            "code": 25,
            "family": {
              "code": "man",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        }
      ]
    },
    {
      "tiles": [
        {
          "tile": {
            "code": 16,
            "family": {
              "code": "sen",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": [
            "inclined"
          ]
        },
        {
          "tile": {
            "code": 16,
            "family": {
              "code": "sen",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": [
            "superposed"
          ]
        },
        {
          "tile": {
            "code": 16,
            "family": {
              "code": "sen",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        },
        {
          "tile": {
            "code": 16,
            "family": {
              "code": "sen",
              "category": {
                "code": "suit"
              }
            }
          },
          "modificators": []
        }
      ]
    }
  ]
}
```