const express = require("express");
const router = express.Router();

const { createDID, checkAuth } = require("../controller/authenticator");

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateDID:
 *          type: object
 *          required:
 *              - privateKey
 *              - authType
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              authType:
 *                  type: number
 *                  description: Type of Authentication role
 *          example:
 *              privateKey: ""
 *              authType: 1
 *      CheckAuth:
 *          type: object
 *          required:
 *              - userAddress
 *          properties:
 *              userAddress:
 *                  type: string
 *                  description: address of User
 *          example:
 *              userAddress: ""
 *
 */

/**
 * @swagger
 * tags:
 *  name: Authenticator
 *  description: Action to Authenticator Contract
 */

/**
 * @swagger
 * /api/authenticator/createDID:
 *  post:
 *      summary: Create DID
 *      tags: [Authenticator]
 *      requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateDID'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/CreateDID'
 */
router.post("/create", createDID);

/**
 * @swagger
 * /api/authenticator/CheckAuth:
 *  get:
 *      summary: Get of user's role
 *      tags: [Authenticator]
 *      parameters:
 *            - in: query
 *              name: userAddress
 *              schema:
 *                type: string
 *              required: true
 *              description: User address to get role
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/CheckAuth'
 */
router.get("/CheckAuth", checkAuth);

module.exports = router;
