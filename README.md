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
const parsed = MpszParser.parse(input);
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

## Supported syntaxes
### MpszParser
- Use tile numbers followed by a family character
  - p : PIN
  - m : MAN
  - S : SOU
  - z : ZIHAI (1234 for East-South-West-North, 567 for White-Green-Red)
- Separate groups with a space
- Add modificators after a tile number
  - \> or < : Inclined
  - ^ : Superposed
  - v : Reverted
  - \* : Aka (five only)
- Add the winning tile at the end separated with a +

Example : 1234p444m 5>67s 11>1^1s + 4p
### JapaneseParser
- Use tile specific characters
  - ➀-➈ : PIN
  - 一-九 : MAN
  - 1-9 : SOU
  - TN西北 : East, South, West, North
  - R中白 : Green, Red, White
- Separate groups with a space
- Add modificators after a tile number
    - \> or < : Inclined
    - ^ : Superposed
    - v : Reverted
    - \* : Aka (five only)
- Add the winning tile at the end separated with a +

Example : ➀➁➂➃四四四 5>67 11>1^1 + ➃
### UnicodeParser
- Use specific unicode characters for mahjong tiles 🀀-🀪
- Separate groups with a space
- Add modificators after a tile number
    - \> or < : Inclined
    - ^ : Superposed
    - v : Reverted
    - \* : Aka (five only)
- Add the winning tile at the end separated with a +

Example : 🀙🀚🀛🀜🀊🀊🀊 🀔*>🀕🀖 🀐v🀐🀐🀐v + 🀜

## Supported Rules
### EMA 2016
Based on latest <a href="http://mahjong-europe.org/portal/images/docs/Riichi-rules-2016-EN.pdf">European Riichi rules</a>  

```
USABLE PROPERTIES

type RoundProps = {
  playerWind?: TileCode,            // current seat wind
  roundWind?: TileCode,             // current prevalent wind
  dora?: TileRef[],                 // exposed dora markers
  uraDora?: TileRef[],              // exposed ura dora markers
  winningKind?: WINNING_KIND,       // type of winning (tsumo, ron, rinshan, chan kan)
  riichi?: boolean,                 // player declared Riichi
  doubleRiichi?: boolean,           // player declared Riichi on first turn
  firstTurnAfterRiichi?: boolean,   // player wins on first turn after declaring Riichi (Ippatsu)
  lastTile?: boolean,               // player wins on last tile
  firstTurn?: boolean               // player wins on first turn
}
```
