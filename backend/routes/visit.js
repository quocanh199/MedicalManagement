const express = require("express");
const router = express.Router();

const { mint, getVisit } = require("../controller/visit");

/**
 * @swagger
 * components:
 *  schemas:
 *      MintVisit:
 *          type: object
 *          required:
 *              - privateKey
 *              - patientId
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              patientId:
 *                  type: number
 *                  description: ID of patient
 *          example:
 *              privateKey: ""
 *              patientId: 1
 *      GetVisit:
 *          type: object
 *          required:
 *              - visitId
 *          properties:
 *              visitId:
 *                  type: number
 *                  description: ID of Visit
 *          example:
 *              visitId: 1
 *
 */

/**
 * @swagger
 * tags:
 *  name: Visit
 *  description: Action to Visit Contract
 */

/**
 * @swagger
 * /api/visit/mint:
 *  post:
 *      summary: Mint Visit token
 *      tags: [Visit]
 *      requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MintVisit'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/MintVisit'
 */
router.post("/mint", mint);

/**
 * @swagger
 * /api/visit/get:
 *  get:
 *      summary: Data of Visit
 *      tags: [Visit]
 *      parameters:
 *            - in: query
 *              name: visitId
 *              schema:
 *                type: number
 *              required: true
 *              description: Visit ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/GetVisit'
 */
router.get("/get", getVisit);

module.exports = router;
