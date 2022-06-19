const express = require("express");
const router = express.Router();

const { mint, getVisit } = require("../controller/visit");

/**
 * @swagger
 * components:
 *  schemas:
 *      Mint:
 *          type: object
 *          required:
 *              - privateKey
 *              - patientId
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              patientId:
 *                  type: int
 *                  description: ID of patient
 *          example:
 *              privateKey: ""
 *              patientId: 1
 *      Get:
 *          type: object
 *          required:
 *              - visitId
 *          properties:
 *              visitId:
 *                  type: int
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
 *                      $ref: '#/components/schemas/Mint'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Mint'
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
 *                type: int
 *              required: true
 *              description: Visit ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Get'
 */
router.get("/get", getVisit);

module.exports = router;
