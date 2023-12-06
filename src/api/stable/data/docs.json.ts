// import { WritableObjectDeep } from "type-fest/source/writable-deep"

import { Simplify } from "type-fest"

const APIDocs = {
  "openapi": "3.0.0",
  "paths": {
    "/integration/webhook/{posName}": {
      "post": {
        "operationId": "IntegrationController_Webhook",
        "parameters": [
          {
            "name": "posName",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "201": {
            "description": ""
          }
        }
      }
    },
    "/integration/releases/{target}/{current_version}": {
      "get": {
        "operationId": "IntegrationController_GetAppVersion",
        "parameters": [
          {
            "name": "current_version",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "target",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    },
    "/integration/releases_prod/{target}/{current_version}": {
      "get": {
        "operationId": "IntegrationController_GetAppVersionn",
        "parameters": [
          {
            "name": "current_version",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "target",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    },
    "/integration/holidayOil": {
      "post": {
        "operationId": "__OldIntegrationController_holidayOil",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        }
      }
    },
    "/integration/tableneeds/menu/updates": {
      "post": {
        "operationId": "__OldIntegrationController_tnmenuupdates",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        }
      }
    },
    "/integration/qu": {
      "post": {
        "operationId": "__OldIntegrationController_qu",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        }
      }
    },
    "/integration/auth/oracle": {
      "post": {
        "operationId": "__OldIntegrationController_authOracle",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        }
      },
      "get": {
        "operationId": "__OldIntegrationController_authOracleGet",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/integration/webhook": {
      "post": {
        "operationId": "__OldIntegrationController_PostWebhookCbsNorthStarPOS",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        }
      }
    },
    "/integration/Square": {
      "post": {
        "operationId": "__OldIntegrationController_GetSquareOrderData",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        }
      }
    },
    "/integration/auth/clover": {
      "get": {
        "operationId": "__OldIntegrationController_authCloverGet",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/": {
      "get": {
        "operationId": "TestController_test",
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/users/get": {
      "post": {
        "operationId": "UsersController_getUsers",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Get Users Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetUsersDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "201": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request: check body"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/users/confirm": {
      "post": {
        "operationId": "UsersController_confirm",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Confirm Email Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ConfirmEmailDto"
              }
            }
          }
        },
        "responses": {
          "202": {
            "description": "Accepted"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/users/reset-password": {
      "post": {
        "operationId": "UsersController_resetPassword",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Reset Password Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ResetPasswordDto"
              }
            }
          }
        },
        "responses": {
          "202": {
            "description": "Accepted"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/users/forgot-password": {
      "post": {
        "operationId": "UsersController_forgotPassword",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Forgot Password Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ForgotPasswordDto"
              }
            }
          }
        },
        "responses": {
          "202": {
            "description": "Accepted"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/users/resend-confirmation-link": {
      "post": {
        "operationId": "UsersController_resendConfirmationLink",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          },
          "202": {
            "description": "Accepted"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/users": {
      "delete": {
        "operationId": "UsersController_deleteUser",
        "summary": "",
        "deprecated": true,
        "parameters": [
          {
            "name": "username",
            "required": true,
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "email",
            "required": true,
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "User not found"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "post": {
        "operationId": "UsersController_createUser",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/createUserDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "201": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request: You cannot create a user with a higher role than yours"
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/users/{_id}": {
      "patch": {
        "operationId": "UsersController_updateUser",
        "parameters": [
          {
            "name": "_id",
            "required": true,
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "description": "User Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/createUserDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request: User not found"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/users/{id}": {
      "get": {
        "operationId": "UsersController_getUser",
        "parameters": [
          {
            "name": "id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "_id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request: User not found"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/company": {
      "post": {
        "operationId": "CompanyController_createCompany",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Company Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateCompanyDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "201": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized."
          },
          "403": {
            "description": "Forbidden."
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "get": {
        "operationId": "CompanyController_getCompanies",
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Company"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized."
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/company/{_id}": {
      "get": {
        "operationId": "CompanyController_getCompany",
        "parameters": [
          {
            "name": "_id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized."
          },
          "404": {
            "description": "Company not found"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "patch": {
        "operationId": "CompanyController_updateCompany",
        "parameters": [
          {
            "name": "_id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "description": "Company Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateCompanyDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized."
          },
          "404": {
            "description": "Company not found"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "delete": {
        "operationId": "CompanyController_deleteCompany",
        "summary": "",
        "deprecated": true,
        "parameters": [
          {
            "name": "_id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized."
          },
          "403": {
            "description": "Forbidden."
          },
          "404": {
            "description": "Company not found"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/location": {
      "post": {
        "operationId": "LocationController_create",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Location Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateLocationDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Location"
                }
              }
            }
          },
          "201": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Location"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request."
          },
          "401": {
            "description": "unauthorized"
          },
          "403": {
            "description": "Forbidden."
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "get": {
        "operationId": "LocationController_getLocations",
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Location"
                  }
                }
              }
            }
          },
          "401": {
            "description": "unauthorized"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/location/{_id}": {
      "post": {
        "operationId": "LocationController_update",
        "parameters": [
          {
            "name": "_id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "description": "Location Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateLocationDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Location"
                }
              }
            }
          },
          "201": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Location"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request."
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden."
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "delete": {
        "operationId": "LocationController_delete",
        "parameters": [
          {
            "name": "_id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Location"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request."
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden."
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "get": {
        "operationId": "LocationController_getLocation",
        "parameters": [
          {
            "name": "_id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Location"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request."
          },
          "401": {
            "description": "unauthorized"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/auth/login": {
      "post": {
        "operationId": "AuthController_login",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "username": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "accessToken",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "accessToken": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized."
          }
        }
      }
    },
    "/auth/profile": {
      "get": {
        "operationId": "AuthController_getProfile",
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/screens": {
      "post": {
        "operationId": "ScreensController_createScreen",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Screen Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateScreenDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Screen"
                }
              }
            }
          },
          "201": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Screen"
                }
              }
            }
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "get": {
        "operationId": "ScreensController_getScreens",
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Screen"
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/screens/{appId}": {
      "delete": {
        "operationId": "ScreensController_deleteScreen",
        "parameters": [
          {
            "name": "appId",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Screen"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Screen not found"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      },
      "patch": {
        "operationId": "ScreensController_updateScreen",
        "parameters": [
          {
            "name": "appId",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "description": "Screen Dto",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateScreenDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Screen"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Screen not found"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/screens/{_id}": {
      "get": {
        "operationId": "ScreensController_getScreen",
        "parameters": [
          {
            "name": "_id",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Screen"
                }
              }
            }
          },
          "404": {
            "description": "Screen not found"
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/s3/upload": {
      "post": {
        "operationId": "S3Controller_upload",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/s3/delete/{key}": {
      "get": {
        "operationId": "S3Controller_delete",
        "parameters": [
          {
            "name": "key",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        },
        "security": [
          {
            "bearer": []
          }
        ]
      }
    },
    "/sftp-xml": {
      "post": {
        "operationId": "SftpXmlController_downloadAndConvertXMLToJson",
        "parameters": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/SftpConfigDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RssChannel"
                }
              }
            }
          },
          "201": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RssChannel"
                }
              }
            }
          }
        }
      }
    },
    "/user-company/deleteCompany/{companyId}": {
      "delete": {
        "operationId": "UserCompanyController_deleteCompany",
        "parameters": [
          {
            "name": "companyId",
            "required": false,
            "in": "path",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "id",
            "required": true,
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Company deleted",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request: Company does not exist"
          }
        }
      }
    },
    "/user-company/deleteUsers": {
      "delete": {
        "operationId": "UserCompanyController_deleteUser",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Array of user ids",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Users deleted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request: User does not exist"
          }
        }
      }
    },
    "/user-company/restoreCompany/{companyId}": {
      "post": {
        "operationId": "UserCompanyController_restoreCompany",
        "parameters": [
          {
            "name": "companyId",
            "required": false,
            "in": "path",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "id",
            "required": true,
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Company restored",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "201": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Company"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request: Company does not exist"
          }
        }
      }
    },
    "/user-company/restoreUsers": {
      "post": {
        "operationId": "UserCompanyController_restoreUser",
        "parameters": [],
        "requestBody": {
          "required": true,
          "description": "Array of user ids",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Users restored",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "201": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request: User does not exist"
          }
        }
      }
    }
  },
  "info": {
    "title": "",
    "description": "",
    "version": "1.0.0",
    "contact": {}
  },
  "tags": [],
  "servers": [],
  "components": {
    "securitySchemes": {
      "bearer": {
        "type": "http",
        "scheme": "bearer"
      }
    },
    "schemas": {
      "GetUsersDto": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "enum": [
              "superAdmin",
              "streamAdmin",
              "manager",
              "user"
            ]
          },
          "userIds": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "verified": {
            "type": "boolean"
          },
          "deleted": {
            "type": "boolean"
          },
          "skip": {
            "type": "number",
            "minimum": 0
          },
          "limit": {
            "type": "number",
            "minimum": 1
          }
        }
      },
      "Company": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "storage": {
            "type": "number"
          },
          "locations": {
            "type": "array",
            "items": {
              "type": "object"
            }
          },
          "deleted": {
            "type": "boolean"
          },
          "_id": {
            "type": "object"
          }
        },
        "required": [
          "name",
          "email",
          "storage",
          "locations",
          "deleted",
          "_id"
        ]
      },
      "Location": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "object"
          },
          "name": {
            "type": "string"
          }
        },
        "required": [
          "_id",
          "name"
        ]
      },
      "User": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "object"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "role": {
            "enum": [
              "superAdmin",
              "streamAdmin",
              "manager",
              "user"
            ],
            "type": "string"
          },
          "company": {
            "$ref": "#/components/schemas/Company"
          },
          "verified": {
            "type": "boolean"
          },
          "FPToken": {
            "type": "string"
          },
          "NUToken": {
            "type": "string"
          },
          "locations": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Location"
            }
          },
          "deleted": {
            "type": "boolean"
          }
        },
        "required": [
          "_id",
          "username",
          "password",
          "role",
          "company",
          "verified",
          "FPToken",
          "NUToken",
          "locations",
          "deleted"
        ]
      },
      "ConfirmEmailDto": {
        "type": "object",
        "properties": {
          "token": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "token",
          "password"
        ]
      },
      "ResetPasswordDto": {
        "type": "object",
        "properties": {
          "token": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "required": [
          "token",
          "password"
        ]
      },
      "ForgotPasswordDto": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          }
        },
        "required": [
          "email"
        ]
      },
      "createUserDto": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string"
          },
          "company": {
            "type": "string"
          },
          "role": {
            "enum": [
              "superAdmin",
              "streamAdmin",
              "manager",
              "user"
            ],
            "type": "string"
          },
          "location": {
            "type": "string"
          }
        },
        "required": [
          "username",
          "company",
          "role",
          "location"
        ]
      },
      "CreateCompanyDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "storage": {
            "type": "number"
          },
          "locations": {
            "type": "array",
            "items": {
              "type": "object"
            }
          },
          "deleted": {
            "type": "boolean"
          }
        },
        "required": [
          "name",
          "email",
          "storage",
          "locations",
          "deleted"
        ]
      },
      "CreateLocationDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ]
      },
      "CreateScreenDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "company": {
            "type": "string"
          },
          "settings": {
            "type": "object"
          },
          "location": {
            "type": "string"
          },
          "appId": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "company",
          "settings",
          "location",
          "appId"
        ]
      },
      "Screen": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "object"
          },
          "appId": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "company": {
            "$ref": "#/components/schemas/Company"
          },
          "settings": {
            "type": "object"
          },
          "location": {
            "$ref": "#/components/schemas/Location"
          }
        },
        "required": [
          "_id",
          "appId",
          "name",
          "company",
          "settings",
          "location"
        ]
      },
      "UpdateScreenDto": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "company": {
            "type": "string"
          },
          "settings": {
            "type": "object"
          }
        },
        "required": [
          "name",
          "company",
          "settings"
        ]
      },
      "SftpConfigDto": {
        "type": "object",
        "properties": {
          "host": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "port": {
            "type": "number"
          },
          "password": {
            "type": "string"
          },
          "filePath": {
            "type": "string"
          }
        },
        "required": [
          "host",
          "username",
          "port",
          "password",
          "filePath"
        ]
      },
      "RssChannelEntry": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "readOnly": true
          },
          "description": {
            "type": "string",
            "readOnly": true
          },
          "items": {
            "readOnly": true,
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "title",
          "description",
          "items"
        ]
      },
      "RssChannel": {
        "type": "object",
        "properties": {
          "generator": {
            "type": "string",
            "readOnly": true
          },
          "title": {
            "type": "string",
            "readOnly": true
          },
          "link": {
            "type": "string",
            "readOnly": true
          },
          "ttl": {
            "type": "string",
            "readOnly": true
          },
          "start=2023-07-19T06:00:00;end=2023-07-26T05:59:59;scheme=W3C-DTF": {
            "readOnly": true,
            "allOf": [
              {
                "$ref": "#/components/schemas/RssChannelEntry"
              }
            ]
          }
        },
        "required": [
          "generator",
          "title",
          "link",
          "ttl",
          "start=2023-07-19T06:00:00;end=2023-07-26T05:59:59;scheme=W3C-DTF"
        ]
      }
    }
  }
} as const


type WritableDeep<T> =
  T extends object ? WritableObjectDeep<T> :
  T extends readonly (infer ArrayType)[] ? WritableDeep<ArrayType>[] :
  T

type WritableObjectDeep<ObjectType extends object> = {
  -readonly [KeyType in keyof ObjectType]: Simplify<WritableDeep<ObjectType[KeyType]>>
};

type APIDocsType = Simplify<WritableDeep<typeof APIDocs>>
export default APIDocs as APIDocsType
