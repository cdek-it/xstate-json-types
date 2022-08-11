// https://stately.ai/registry/editor/share/8763d77d-da64-40c5-8af6-c9d768db954c
export default {
  "id": "toggle",
  "initial": "OFF",
  "states": {
    "OFF": {
      "on": {
        "SET ON": {
          "target": "ON"
        }
      }
    },
    "ON": {
      "on": {
        "SET OFF": {
          "target": "OFF"
        }
      }
    }
  }
} as const