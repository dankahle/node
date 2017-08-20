'use strict';

let _ = require('lodash'),
   Rx = require('rxjs'),
   Observable = Rx.Observable,
   Subject = Rx.Subject,
   fs = require('fs'),
   request = require('request'),
   log = console.log,
   elog = console.log.bind({}, 'MY_ERROR:'),
   Q = require('q');


var tiles = [
   {
      "id": "aaa07481-620c-5c23-83b4-ea7f56eeedfc",
      "name": "Inbound Status",
      "category": "Inbound",
      "tileDirective": "inboundStatusTile",
      "settingsDirective": "inboundStatusTileSettings",
      "hideTitle": false,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/column2.jpg",
      "sizeX": 2,
      "sizeY": 3,
      "minSizeX": 1,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "inboundStatusTile/module.js",
            "inboundStatusTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "dateRange": "last30Days"
      },
      "permissions": []
   },
   {
      "id": "98373036-2e02-509d-9b92-ce39f80a008f",
      "name": "File Definition",
      "category": "Inbound",
      "tileDirective": "fileDefinitionTile",
      "hideTitle": false,
      "settingsFormly": [
         {
            "key": "dateRange",
            "type": "dateRangeSelect",
            "templateOptions": {
               "label": "Date Range"
            }
         },
         {
            "key": "ingestionId",
            "type": "fileDefinitionSelect",
            "templateOptions": {
               "label": "File Definition"
            }
         }
      ],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/column2.jpg",
      "sizeX": 3,
      "sizeY": 2,
      "minSizeX": 3,
      "minSizeY": 2,
      "hideCoreLabel": true,
      "assets": {
         "internal": [
            "fileDefinitionTile/module.js",
            "fileDefinitionTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "dateRange": "last24"
      },
      "permissions": []
   },
   {
      "id": "b9d1faf7-7455-50be-a39e-4f59b9bc4576",
      "name": "",
      "category": "Insights",
      "tileDirective": "highChartsTile",
      "settingsDirective": "highChartsTile.insightsSettings",
      "dataService": "highChartsTile.insightsService",
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/insights/dataService.js",
            "highChartsTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "reportId": null,
         "dataSetId": null,
         "campaigns": [],
         "chartType": "column",
         "refreshInterval": 2,
         "startDate": "2015-04-27T13:21:24.939Z",
         "endDate": "2015-07-30T13:21:24.939Z"
      },
      "permissions": []
   },
   {
      "id": "bb78a4e8-3e6a-548a-a38a-7560543dd83a",
      "name": "",
      "category": "Insights",
      "tileDirective": "highChartsSynchronizedTile",
      "settingsDirective": "highChartsTile.insightsSettings",
      "dataService": "highChartsSynchronizedTile.insightsService",
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/insights/dataService.js",
            "highChartsSynchronizedTile/module.js",
            "highChartsSynchronizedTile/insights/dataService.js",
            "highChartsSynchronizedTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "enableTitle": true,
         "reportId": null,
         "dataSetId": null,
         "campaigns": [],
         "chartType": "column",
         "refreshInterval": 2,
         "startDate": "2015-04-27T13:21:24.939Z",
         "endDate": "2015-07-30T13:21:24.939Z"
      },
      "permissions": []
   },
   {
      "id": "5a1a7f6e-2a41-5406-a839-18d3e3ba7572",
      "name": "",
      "category": "Insights",
      "tileDirective": "miniTile",
      "dataService": "miniTile.insightsService",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "miniTile/module.js",
            "miniTile/style.css",
            "miniTile/insights/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "iconClass": "glyphicon glyphicon-user",
         "iconColor": "#80a0b6"
      },
      "permissions": []
   },
   {
      "id": "c9aef544-45f9-5e78-b586-6f918b2396ea",
      "name": "Total Email Opens by Month",
      "tileDirective": "highChartsTile",
      "dataService": "openEmailsByMonthService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows the total opens relative to the number of emails delivered by month for the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/openEmailsByMonth/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "c42fd21d-11f8-5215-958a-1a753544c34d",
      "name": "App Shortcut",
      "category": "Partner Apps",
      "tileDirective": "appLinkTile",
      "settingsDirective": "appLinkTileSettings",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/add.jpg",
      "sizeX": 1,
      "sizeY": 1,
      "minSizeX": 1,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "appLinkTile/module.js",
            "appLinkTile/style.css"
         ],
         "external": []
      },
      "permissions": []
   },
   {
      "id": "2e6c6b2e-bf7a-56fa-a9f3-7ff81c9fdc8a",
      "name": "Total Email Clicks to Opens by Month",
      "tileDirective": "highChartsTile",
      "dataService": "clickedEmailsByMonthService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows the total clicks relative to the number of emails opened by month for the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/clickedEmailsByMonth/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "438086f3-a333-5184-ad43-ad17e533dd29",
      "name": "Total Revenue by Month",
      "tileDirective": "highChartsTile",
      "dataService": "revenueByMonthService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows the total revenue by month for the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/revenueByMonth/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "23576b72-64aa-534a-8f72-18da6adebe7b",
      "name": "Total Opt-Outs by Month",
      "tileDirective": "highChartsTile",
      "dataService": "optOutsByMonthService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows the total opt-outs by month for the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/optOutsByMonth/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "aaa07481-620c-5c23-83b4-ea7f56eeedff",
      "name": "Total Purchases by Month",
      "tileDirective": "highChartsTile",
      "dataService": "purchasesByMonthService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows the total direct and inferred response purchases by month for the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/column5.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/purchasesByMonth/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "a4657844-7560-5568-bd76-34efda73e515",
      "name": "Total Units by Month",
      "tileDirective": "highChartsTile",
      "dataService": "unitsByMonthService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows the total units by month for the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/column5.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/unitsByMonth/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "30d80cb0-8c49-54be-979d-39faa6f04a1e",
      "name": "Average Units by Transaction by Month",
      "tileDirective": "highChartsTile",
      "dataService": "averageUnitsByMonthService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows the average number of units purchased per transaction by month for the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/column5.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/averageUnitsByMonth/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "927b2621-a525-54df-bc60-6c2ca6a56536",
      "name": "Email Response Attribution",
      "tileDirective": "highChartsTile",
      "dataService": "emailResponseAttributionService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows email response by campaign over the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/column3.jpg",
      "sizeX": 8,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/emailResponseAttribution/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "02279730-4a42-5101-b4b3-881dc762a007",
      "name": "Purchase Response Attribution",
      "tileDirective": "highChartsTile",
      "dataService": "purchaseResponseAttributionService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows purchase response by campaign over the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/column3.jpg",
      "sizeX": 8,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/purchaseResponseAttribution/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "1a2931fe-52d1-5e41-9230-887517605c18",
      "name": "Average Purchase Value by Month",
      "tileDirective": "highChartsTile",
      "dataService": "avgPurchaseValueByMonthService",
      "settingsFormly": [
         {
            "key": "refreshInterval",
            "type": "select",
            "templateOptions": {
               "label": "Refresh Interval (in minutes)",
               "options": [
                  {
                     "name": "2",
                     "value": 2
                  },
                  {
                     "name": "5",
                     "value": 5
                  },
                  {
                     "name": "10",
                     "value": 10
                  },
                  {
                     "name": "30",
                     "value": 30
                  },
                  {
                     "name": "60",
                     "value": 60
                  }
               ]
            }
         },
         {
            "key": "startDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "Start Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         },
         {
            "key": "endDate",
            "type": "datepicker",
            "templateOptions": {
               "label": "End Date",
               "type": "text",
               "datepickerPopup": "yyyy/MM",
               "datepickerMode": "month",
               "minMode": "month"
            }
         }
      ],
      "description": "shows the average purchase amount by month for the selected date range.",
      "iconUrl": "/CDN/tiles/images/icons/column8.jpg",
      "sizeX": 2,
      "sizeY": 2,
      "minSizeX": 2,
      "minSizeY": 2,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/avgPurchaseValueByMonth/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "01969574-dc7f-5ee4-ab7b-dfb3106feed6",
      "name": "Title",
      "category": "Extras",
      "tileDirective": "titleTile",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "title",
            "type": "input",
            "templateOptions": {
               "label": "Title",
               "placeholder": "Enter a title to display",
               "maxlength": "100",
               "required": true
            }
         },
         {
            "key": "subTitle",
            "type": "textarea",
            "templateOptions": {
               "label": "Subtitle",
               "placeholder": "Enter a subtitle to display",
               "rows": 3
            }
         }
      ],
      "description": "Add a title/subtitle to your dashboard to organize content",
      "iconUrl": "/CDN/tiles/images/icons/label.jpg",
      "transparent": true,
      "sizeX": 4,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "hideCoreLabel": true,
      "assets": {
         "internal": [
            "titleTile/module.js",
            "titleTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "title": "Title"
      },
      "permissions": []
   },
   {
      "id": "01969574-dc7f-5ee4-ab7b-dfb3106feeda",
      "name": "Number Tile",
      "category": "Extras",
      "tileDirective": "numberTile",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "label",
            "type": "input",
            "templateOptions": {
               "label": "Label",
               "placeholder": "label"
            }
         },
         {
            "key": "value",
            "type": "input",
            "templateOptions": {
               "label": "Value",
               "placeholder": "234"
            }
         },
         {
            "key": "icon",
            "type": "input",
            "templateOptions": {
               "label": "icon class",
               "placeholder": "glyphicon glyphicon-arrow-up"
            }
         },
         {
            "key": "iconColor",
            "type": "input",
            "templateOptions": {
               "label": "Label",
               "placeholder": "#3c763d"
            }
         }
      ],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 1,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "numberTile/module.js",
            "numberTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "icon": "glyphicon glyphicon-arrow-up",
         "iconColor": "green",
         "label": "My Custom Label",
         "value": "234"
      },
      "permissions": [
         "demo"
      ]
   },
   {
      "id": "b1969574-gc7f-2ee4-fb7a-efb3106dead3",
      "name": "Trending Buyer Recency",
      "tileDirective": "highChartsSparklineTile",
      "dataService": "trendingBuyerRecencyService",
      "settingsFormly": [
         {
            "key": "duration",
            "type": "select",
            "templateOptions": {
               "label": "Time Unit",
               "options": [
                  {
                     "name": "Day",
                     "value": "day"
                  },
                  {
                     "name": "Week",
                     "value": "week"
                  },
                  {
                     "name": "Month",
                     "value": "month"
                  },
                  {
                     "name": "Year",
                     "value": "year"
                  }
               ]
            }
         }
      ],
      "description": "View of the data source manifest by current % of total for each status",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 4,
      "sizeY": 3,
      "minSizeX": 4,
      "minSizeY": 3,
      "assets": {
         "internal": [
            "highChartsSparklineTile/module.js",
            "highChartsSparklineTile/style.css,trendingBuyerRecency/dataService.js",
            "highChartsSparklineTile/highChartsSparklineTile/style.css,trendingBuyerRecency/dataService.js,trendingBuyerRecency/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "duration": "month"
      },
      "permissions": []
   },
   {
      "id": "f1369574-be7f-1wt3-rg8d-fen31068hf2g",
      "name": "Trending Buyer Spending",
      "tileDirective": "highChartsSparklineTile",
      "dataService": "trendingBuyerSpendService",
      "settingsFormly": [
         {
            "key": "duration",
            "type": "select",
            "templateOptions": {
               "label": "Time Unit",
               "options": [
                  {
                     "name": "Day",
                     "value": "day"
                  },
                  {
                     "name": "Week",
                     "value": "week"
                  },
                  {
                     "name": "Month",
                     "value": "month"
                  },
                  {
                     "name": "Year",
                     "value": "year"
                  }
               ]
            }
         }
      ],
      "description": "View of the data source manifest by current % of total for each status",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 4,
      "sizeY": 3,
      "minSizeX": 4,
      "minSizeY": 3,
      "assets": {
         "internal": [
            "highChartsSparklineTile/module.js",
            "highChartsSparklineTile/style.css,trendingBuyerSpend/dataService.js",
            "highChartsSparklineTile/highChartsSparklineTile/style.css,trendingBuyerSpend/dataService.js,trendingBuyerSpend/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "duration": "month"
      },
      "permissions": []
   },
   {
      "id": "3us3d8fh3-du3y-si4f-d8fh-cid18ej3sh3",
      "name": "Trending Buyer Times",
      "tileDirective": "highChartsSparklineTile",
      "dataService": "trendingBuyerTimeService",
      "settingsFormly": [
         {
            "key": "duration",
            "type": "select",
            "templateOptions": {
               "label": "Time Unit",
               "options": [
                  {
                     "name": "Day",
                     "value": "day"
                  },
                  {
                     "name": "Week",
                     "value": "week"
                  },
                  {
                     "name": "Month",
                     "value": "month"
                  },
                  {
                     "name": "Year",
                     "value": "year"
                  }
               ]
            }
         }
      ],
      "description": "View of the data source manifest by current % of total for each status",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 4,
      "sizeY": 3,
      "minSizeX": 4,
      "minSizeY": 3,
      "assets": {
         "internal": [
            "highChartsSparklineTile/module.js",
            "highChartsSparklineTile/style.css,trendingBuyerTime/dataService.js",
            "highChartsSparklineTile/highChartsSparklineTile/style.css,trendingBuyerTime/dataService.js,trendingBuyerTime/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "duration": "month"
      },
      "permissions": []
   },
   {
      "id": "ywf5jfjs2-g8j3-g0wj-d92j-39gjs9h3f82",
      "name": "Direct Mail Reach",
      "tileDirective": "miniTile",
      "dataService": "directMailReachService",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "duration",
            "type": "select",
            "templateOptions": {
               "label": "Time Unit",
               "options": [
                  {
                     "name": "Day",
                     "value": "day"
                  },
                  {
                     "name": "Week",
                     "value": "week"
                  },
                  {
                     "name": "Month",
                     "value": "month"
                  },
                  {
                     "name": "Year",
                     "value": "year"
                  }
               ]
            }
         }
      ],
      "description": "View of the data source manifest by current % of total for each status",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "miniTile/module.js",
            "miniTile/style.css",
            "miniTile/directMailReach/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "duration": "month",
         "iconClass": "glyphicon glyphicon-envelope",
         "iconColor": "#80a0b6"
      },
      "permissions": []
   },
   {
      "id": "3if8fu382-f83i-g9sh-hd83-f82jf83ja93",
      "name": "Buyer Status Trending",
      "tileDirective": "miniTile",
      "dataService": "buyerStatusTrendingService",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "duration",
            "type": "select",
            "templateOptions": {
               "label": "Time Unit",
               "options": [
                  {
                     "name": "Day",
                     "value": "day"
                  },
                  {
                     "name": "Week",
                     "value": "week"
                  },
                  {
                     "name": "Month",
                     "value": "month"
                  },
                  {
                     "name": "Year",
                     "value": "year"
                  }
               ]
            }
         }
      ],
      "description": "View of the data source manifest by current % of total for each status",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "miniTile/module.js",
            "miniTile/style.css",
            "miniTile/buyerStatusTrending/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "duration": "month",
         "iconClass": "glyphicon glyphicon-user",
         "iconColor": "#80a0b6"
      },
      "permissions": []
   },
   {
      "id": "3if8fu382-f83i-g9sh-hd83-f82jf83ja94",
      "name": "Total Buyers",
      "tileDirective": "miniTile",
      "dataService": "buyersTotalService",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "Count of all buyer types at the time of the most current MDM build",
      "iconUrl": "/CDN/tiles/images/icons/buyertotal.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "miniTile/module.js",
            "miniTile/style.css",
            "miniTile/buyers/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "duration": "month",
         "iconClass": "glyphicon glyphicon-user",
         "iconColor": "#80a0b6"
      },
      "permissions": []
   },
   {
      "id": "3if8fu382-f83i-g9sh-hd83-f82jf83ja95",
      "name": "Inactive Buyers",
      "tileDirective": "miniTile",
      "dataService": "buyersInactiveService",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "Count of inactive buyer types at the time of the most current MDM build",
      "iconUrl": "/CDN/tiles/images/icons/buyerinactive.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "miniTile/module.js",
            "miniTile/style.css",
            "miniTile/buyers/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "duration": "month",
         "iconClass": "glyphicon glyphicon-user",
         "iconColor": "#80a0b6"
      },
      "permissions": []
   },
   {
      "id": "3if8fu382-f83i-g9sh-hd83-f82jf83ja96",
      "name": "New Buyers",
      "tileDirective": "miniTile",
      "dataService": "buyersNewService",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "Count of new buyer types at the time of the most current MDM build",
      "iconUrl": "/CDN/tiles/images/icons/buyernew.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "miniTile/module.js",
            "miniTile/style.css",
            "miniTile/buyers/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "duration": "month",
         "iconClass": "glyphicon glyphicon-user",
         "iconColor": "#80a0b6"
      },
      "permissions": []
   },
   {
      "id": "3if8fu382-f83i-g9sh-hd83-f82jf83ja97",
      "name": "Active Buyers",
      "tileDirective": "miniTile",
      "dataService": "buyersActiveService",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "Count of active buyer types at the time of the most current MDM build",
      "iconUrl": "/CDN/tiles/images/icons/buyeractive.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "miniTile/module.js",
            "miniTile/style.css",
            "miniTile/buyers/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "duration": "month",
         "iconClass": "glyphicon glyphicon-user",
         "iconColor": "#80a0b6"
      },
      "permissions": []
   },
   {
      "id": "849v5eu58-f7ej-8e6j-8fj5-djd5s8jf763",
      "name": "Channel Engagement By Buyer Status",
      "tileDirective": "highChartsTile",
      "dataService": "channelEngagementByBuyerStatus",
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/column8.jpg",
      "sizeX": 1,
      "sizeY": 1,
      "minSizeX": 1,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/channelEngagementByBuyerStatus/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "849v5eu58-f7ej-8e6j-8fj5-q9foi398sk3",
      "name": "Purchase Recency",
      "tileDirective": "highChartsTile",
      "dataService": "purchaseRecency",
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/pie.jpg",
      "sizeX": 1,
      "sizeY": 1,
      "minSizeX": 1,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/purchaseRecency/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "849v5eu58-f7ej-8e6j-8fj5-i3hf7s7wh58",
      "name": "Purchase Frequency",
      "tileDirective": "highChartsTile",
      "dataService": "purchaseFrequency",
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/pie.jpg",
      "sizeX": 1,
      "sizeY": 1,
      "minSizeX": 1,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/purchaseFrequency/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "849v5eu58-f7ej-8e6j-8fj5-i3hf72s3js9",
      "name": "Purchase Monetary",
      "tileDirective": "highChartsTile",
      "dataService": "purchaseMonetary",
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/pie.jpg",
      "sizeX": 1,
      "sizeY": 1,
      "minSizeX": 1,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/purchaseMonetary/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "849v5eu58-f7ej-8e6j-8fj5-i3hf7s7ia8f",
      "name": "RFM Distribution",
      "tileDirective": "highChartsTile",
      "dataService": "rfmDistribution",
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/column5.jpg",
      "sizeX": 1,
      "sizeY": 1,
      "minSizeX": 1,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/rfmDistribution/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "refreshInterval": 10
      },
      "permissions": []
   },
   {
      "id": "9fb370fa-b220-5f73-b418-0f22b8014231",
      "name": "Demo HighCharts",
      "category": "Extras",
      "tileDirective": "highChartsTile",
      "dataService": "demoHighCharts",
      "settingsFormly": [
         {
            "key": "name",
            "type": "input",
            "templateOptions": {
               "label": "Title",
               "placeholder": "Enter a title to display",
               "maxlength": "100",
               "required": true
            }
         },
         {
            "key": "refreshInterval",
            "type": "input",
            "templateOptions": {
               "label": "refresh interval",
               "placeholder": "100"
            }
         },
         {
            "key": "highChartsJson",
            "type": "textarea",
            "templateOptions": {
               "label": "highCharts JSON",
               "placeholder": "Enter compliant highChartsJson",
               "rows": 3
            }
         }
      ],
      "description": "Add a demo highcharts tile",
      "iconUrl": "/CDN/tiles/images/icons/pie.jpg",
      "sizeX": 4,
      "sizeY": 3,
      "minSizeX": 2,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/demoHighCharts/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "name": "Title",
         "refreshInterval": 100
      },
      "permissions": [
         "demo"
      ]
   },
   {
      "id": "01969574-dc7f-5ee4-ab7b-dfb3106feedz",
      "name": "Metric Tile",
      "category": "Extras",
      "tileDirective": "numberTile",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "assets": {
         "internal": [
            "numberTile/module.js",
            "numberTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "icon": "glyphicon glyphicon-arrow-up",
         "iconColor": "green",
         "label": "This is a metric",
         "metricName": "abc"
      },
      "permissions": []
   },
   {
      "id": "b9d12af7-7455-50be-a39e-4f59b9bc4576",
      "name": "Core Metrics",
      "category": "Extras",
      "tileDirective": "highChartsTile",
      "dataService": "coreMetricsService",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "coreId",
            "type": "coreSelect"
         }
      ],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 4,
      "sizeY": 4,
      "minSizeX": 4,
      "minSizeY": 4,
      "highChartConfig": {
         "options": {
            "xAxis": {
               "categories": [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
               ]
            },
            "yAxis": {
               "title": {
                  "text": "Temperature (°C)"
               },
               "plotLines": [
                  {
                     "value": 0,
                     "width": 1,
                     "color": "#808080"
                  }
               ]
            },
            "tooltip": {
               "valueSuffix": "°C"
            },
            "legend": {
               "layout": "vertical",
               "align": "right",
               "verticalAlign": "middle",
               "borderWidth": 0
            }
         },
         "title": {
            "text": "@title",
            "x": -20
         },
         "subtitle": {
            "text": "@subTitle",
            "x": -20
         },
         "series": [
            "@test1",
            "@test2",
            "@test3",
            "@test4"
         ]
      },
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/coreMetrics/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "enableTitle": true,
         "refreshInterval": 1
      },
      "permissions": []
   },
   {
      "id": "d2fec1b1-878e-4e72-a1e0-a7cfe3a499b0",
      "name": "Analytics - HDFS Utilization",
      "category": "Extras",
      "tileDirective": "numberTile",
      "settingsDirective": "numberTileSettings",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "hideCoreLabel": true,
      "assets": {
         "internal": [
            "numberTile/module.js",
            "numberTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "icon": "glyphicon glyphicon-eye-open",
         "iconColor": "orange",
         "label": "HDFS Utilization",
         "metricName": "hdfs_utilization"
      },
      "permissions": []
   },
   {
      "id": "51509333-dc7f-5ee4-ab7b-dfb3106feedz",
      "name": "Analytics - Total Sources",
      "category": "Extras",
      "tileDirective": "numberTile",
      "settingsDirective": "numberTileSettings",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "hideCoreLabel": true,
      "assets": {
         "internal": [
            "numberTile/module.js",
            "numberTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "icon": "glyphicon glyphicon-list",
         "iconColor": "red",
         "label": "Total Sources",
         "metricName": "total_sources"
      },
      "permissions": []
   },
   {
      "id": "2c67ae8b-f68a-4dae-8c4e-a3ac805b2553",
      "name": "Analytics - HDFS Free Space",
      "category": "Extras",
      "tileDirective": "numberTile",
      "settingsDirective": "numberTileSettings",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "hideCoreLabel": true,
      "assets": {
         "internal": [
            "numberTile/module.js",
            "numberTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "icon": "glyphicon glyphicon-hdd",
         "iconColor": "orange",
         "label": "HDFS Free Space",
         "metricName": "hdfs_free_space"
      },
      "permissions": []
   },
   {
      "id": "b0cf71e0-2c4c-47eb-a53c-92b8a951dea2",
      "name": "Analytics - HDFS Used Space",
      "category": "Extras",
      "tileDirective": "numberTile",
      "settingsDirective": "numberTileSettings",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "hideCoreLabel": true,
      "assets": {
         "internal": [
            "numberTile/module.js",
            "numberTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "icon": "glyphicon glyphicon-hdd",
         "iconColor": "orange",
         "label": "HDFS Used Space",
         "metricName": "hdfs_used_space"
      },
      "permissions": []
   },
   {
      "id": "7ca9b8d1-cd93-48d9-adcf-faba8fd99e38",
      "name": "Analytics - Total Records With A PEL Assigned",
      "category": "Extras",
      "tileDirective": "numberTile",
      "settingsDirective": "numberTileSettings",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "hideCoreLabel": true,
      "assets": {
         "internal": [
            "numberTile/module.js",
            "numberTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "icon": "glyphicon glyphicon-user",
         "iconColor": "#ff6600",
         "label": "Total Records With A PEL Assigned",
         "metricName": "total_individuals"
      },
      "permissions": []
   },
   {
      "id": "3e266da6-479b-4778-a74f-bea0b77796a6",
      "name": "Analytics - Total Records",
      "category": "Extras",
      "tileDirective": "numberTile",
      "settingsDirective": "numberTileSettings",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "hideCoreLabel": true,
      "assets": {
         "internal": [
            "numberTile/module.js",
            "numberTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "icon": "glyphicon glyphicon-globe",
         "iconColor": "DarkBlue",
         "label": "Total Records",
         "metricName": "total_records"
      },
      "permissions": []
   },
   {
      "id": "jsd12af7-7455-50be-a39e-4f59b9bc4576",
      "name": "Analytics - Total Records Processed 30 Days",
      "category": "Extras",
      "tileDirective": "highChartsTile",
      "dataService": "coreMetricsService",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "coreId",
            "type": "coreSelect"
         }
      ],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 4,
      "sizeY": 4,
      "minSizeX": 2,
      "minSizeY": 2,
      "hideCoreLabel": true,
      "highChartConfig": {
         "options": {
            "xAxis": {
               "categories": "@total_records_processed_30_days_x_axis"
            },
            "yAxis": {
               "title": {
                  "text": "Records Processed"
               },
               "plotLines": [
                  {
                     "value": 0,
                     "width": 1,
                     "color": "#808080"
                  }
               ]
            },
            "tooltip": {
               "valueSuffix": " "
            },
            "legend": {
               "layout": "vertical",
               "align": "right",
               "verticalAlign": "middle",
               "borderWidth": 0
            }
         },
         "title": {
            "text": "Total Records Processed 30 Days",
            "x": -20
         },
         "subtitle": {
            "text": " ",
            "x": -20
         },
         "series": [
            {
               "name": "Total Records",
               "data": "@total_records_processed_30_days_data"
            }
         ]
      },
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/coreMetrics/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "enableTitle": true,
         "refreshInterval": 1
      },
      "permissions": []
   },
   {
      "id": "38dc87fd-2eff-4761-acf3-ae48677ca1e0",
      "name": "Analytics - HDFS Total Space",
      "category": "Extras",
      "tileDirective": "numberTile",
      "settingsDirective": "numberTileSettings",
      "hideTitle": true,
      "settingsFormly": [],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/number.jpg",
      "sizeX": 2,
      "sizeY": 1,
      "minSizeX": 2,
      "minSizeY": 1,
      "hideCoreLabel": true,
      "assets": {
         "internal": [
            "numberTile/module.js",
            "numberTile/style.css"
         ],
         "external": []
      },
      "settings": {
         "icon": "glyphicon glyphicon-hdd",
         "iconColor": "orange",
         "label": "HDFS Total Space",
         "metricName": "hdfs_total_space"
      },
      "permissions": []
   },
   {
      "id": "a1361a20-1431-48a3-bd1a-0d7c586e23d6",
      "name": "Analytics - DCM Impressions Last 30 Days",
      "category": "Extras",
      "tileDirective": "highChartsTile",
      "dataService": "coreMetricsService",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "coreId",
            "type": "coreSelect"
         }
      ],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 4,
      "sizeY": 4,
      "minSizeX": 2,
      "minSizeY": 2,
      "hideCoreLabel": true,
      "highChartConfig": {
         "title": {
            "text": "DCM Impressions Last 30 Days",
            "x": -20
         },
         "subtitle": {
            "text": " ",
            "x": -20
         },
         "xAxis": {
            "categories": "@dcm_impression_last_30_days_x_axis"
         },
         "yAxis": {
            "title": {
               "text": "Records Loaded"
            },
            "plotLines": [
               {
                  "value": 0,
                  "width": 1,
                  "color": "#808080"
               }
            ]
         },
         "tooltip": {
            "valueSuffix": " "
         },
         "legend": {
            "layout": "vertical",
            "align": "right",
            "verticalAlign": "middle",
            "borderWidth": 0
         },
         "series": [
            {
               "name": "Total Records",
               "data": "@dcm_impression_last_30_days_data"
            }
         ]
      },
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/coreMetrics/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "enableTitle": true,
         "refreshInterval": 1
      },
      "permissions": []
   },
   {
      "id": "63522a06-22e2-4d4f-8cfa-0fb5958922c1",
      "name": "Analytics - DCM Activity Last 30 Days",
      "category": "Extras",
      "tileDirective": "highChartsTile",
      "dataService": "coreMetricsService",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "coreId",
            "type": "coreSelect"
         }
      ],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 4,
      "sizeY": 4,
      "minSizeX": 2,
      "minSizeY": 2,
      "hideCoreLabel": true,
      "highChartConfig": {
         "title": {
            "text": "DCM Activity Last 30 Days",
            "x": -20
         },
         "subtitle": {
            "text": " ",
            "x": -20
         },
         "xAxis": {
            "categories": "@dcm_activity_last_30_days_x_axis"
         },
         "yAxis": {
            "title": {
               "text": "Records Loaded"
            },
            "plotLines": [
               {
                  "value": 0,
                  "width": 1,
                  "color": "#808080"
               }
            ]
         },
         "tooltip": {
            "valueSuffix": " "
         },
         "legend": {
            "layout": "vertical",
            "align": "right",
            "verticalAlign": "middle",
            "borderWidth": 0
         },
         "series": [
            {
               "name": "Total Records",
               "data": "@dcm_activity_last_30_days_data"
            }
         ]
      },
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/coreMetrics/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "enableTitle": true,
         "refreshInterval": 1
      },
      "permissions": []
   },
   {
      "id": "466eaec6-a092-4315-bbc9-fce223d6372c",
      "name": "Analytics - DCM Clicks Last 30 Days",
      "category": "Extras",
      "tileDirective": "highChartsTile",
      "dataService": "coreMetricsService",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "coreId",
            "type": "coreSelect"
         }
      ],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 4,
      "sizeY": 4,
      "minSizeX": 2,
      "minSizeY": 2,
      "hideCoreLabel": true,
      "highChartConfig": {
         "title": {
            "text": "DCM Clicks Last 30 Days",
            "x": -20
         },
         "subtitle": {
            "text": " ",
            "x": -20
         },
         "xAxis": {
            "categories": "@dcm_click_last_30_days_x_axis"
         },
         "yAxis": {
            "title": {
               "text": "Records Loaded"
            },
            "plotLines": [
               {
                  "value": 0,
                  "width": 1,
                  "color": "#808080"
               }
            ]
         },
         "tooltip": {
            "valueSuffix": " "
         },
         "legend": {
            "layout": "vertical",
            "align": "right",
            "verticalAlign": "middle",
            "borderWidth": 0
         },
         "series": [
            {
               "name": "Total Records",
               "data": "@dcm_click_last_30_days_data"
            }
         ]
      },
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/coreMetrics/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "enableTitle": true,
         "refreshInterval": 1
      },
      "permissions": []
   },
   {
      "id": "1d2d6284-5dcb-4687-a6e8-7861139245d7",
      "name": "Analytics - Total Number of Sales Last 30 Days",
      "category": "Extras",
      "tileDirective": "highChartsTile",
      "dataService": "coreMetricsService",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "coreId",
            "type": "coreSelect"
         }
      ],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 4,
      "sizeY": 4,
      "minSizeX": 2,
      "minSizeY": 2,
      "hideCoreLabel": true,
      "highChartConfig": {
         "title": {
            "text": "Total Number of Sales Last 30 Days",
            "x": -20
         },
         "subtitle": {
            "text": " ",
            "x": -20
         },
         "xAxis": {
            "categories": "@total_num_sales_last_30_days_x_axis"
         },
         "yAxis": {
            "title": {
               "text": "# Sales"
            },
            "plotLines": [
               {
                  "value": 0,
                  "width": 1,
                  "color": "#808080"
               }
            ]
         },
         "tooltip": {
            "valueSuffix": " "
         },
         "legend": {
            "layout": "vertical",
            "align": "right",
            "verticalAlign": "middle",
            "borderWidth": 0
         },
         "series": [
            {
               "name": "# Sales",
               "data": "@total_num_sales_last_30_days_data"
            }
         ]
      },
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/coreMetrics/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "enableTitle": true,
         "refreshInterval": 1
      },
      "permissions": []
   },
   {
      "id": "10444c2d-7030-4702-908b-d1cda245d9b2",
      "name": "Analytics - Total Sales Amount Last 30 Days",
      "category": "Extras",
      "tileDirective": "highChartsTile",
      "dataService": "coreMetricsService",
      "hideTitle": true,
      "settingsFormly": [
         {
            "key": "coreId",
            "type": "coreSelect"
         }
      ],
      "description": "",
      "iconUrl": "/CDN/tiles/images/icons/area3.jpg",
      "sizeX": 4,
      "sizeY": 4,
      "minSizeX": 2,
      "minSizeY": 2,
      "hideCoreLabel": true,
      "highChartConfig": {
         "title": {
            "text": "Total Sales Amount Last 30 Days",
            "x": -20
         },
         "subtitle": {
            "text": " ",
            "x": -20
         },
         "xAxis": {
            "categories": "@total_sales_amt_last_30_days_x_axis"
         },
         "yAxis": {
            "title": {
               "text": "Sales Amount"
            },
            "plotLines": [
               {
                  "value": 0,
                  "width": 1,
                  "color": "#808080"
               }
            ]
         },
         "tooltip": {
            "valueSuffix": " "
         },
         "legend": {
            "layout": "vertical",
            "align": "right",
            "verticalAlign": "middle",
            "borderWidth": 0
         },
         "series": [
            {
               "name": "Sales Amt",
               "data": "@total_sales_amt_last_30_days_data"
            }
         ]
      },
      "assets": {
         "internal": [
            "highChartsTile/module.js",
            "highChartsTile/coreMetrics/dataService.js"
         ],
         "external": []
      },
      "settings": {
         "enableTitle": true,
         "refreshInterval": 1
      },
      "permissions": []
   }
];


tiles = _.sortBy(tiles, ['category', 'name']);
tiles.forEach(tile => log('tile', tile.category, tile.name ? tile.name : '>>>>>>>> noname'));


log('total', tiles.length);
log('unique by cat/name', _.uniqWith(tiles, categoryAndNameEqual).length);
let tiles2 = [tiles[0]];
let dups = _.intersectionWith(tiles2, tiles, categoryAndNameEqual);
if(dups.length > 0) {
   log('>>>>>>> duplicates:');
   dups.forEach(tile => log('category: ' + tile.category + ', name: ' + tile.name));
}

function categoryAndNameEqual(tile1, tile2) {
   // log('tile1', tile1.name, 'tile2', tile2.name);
   if (!tile1.category || !tile2.category || !tile1.name || !tile2.name) {
      return false;
   }

   var equal =  tile1.category.toLowerCase() === tile2.category.toLowerCase() &&
      tile1.name.toLowerCase() === tile2.name.toLowerCase();

   if (equal) {
      console.log('duplicate tile: category: ' + tile1.category + ', name: ' + tile1.name);
   }

   return equal;
}

/*

 log(_.uniqBy(tiles, 'name').length);
 log(_.uniqWith(tiles, checkName).length);
 tiles.forEach(tile => {
 if(!tile.name) {
 log('noname', tile);
 }
 })
 */
