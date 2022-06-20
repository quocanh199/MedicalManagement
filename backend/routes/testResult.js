const express = require("express");
const router = express.Router();

const { mint, getTestResult } = require("../controller/testResult");

/**
 * @swagger
 * components:
 *  schemas:
 *      MintTestResult:
 *          type: object
 *          required:
 *              - privateKey
 *              - name
 *              - result
 *              - visitId
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              name:
 *                  type: string
 *                  description: name of Test
 *              result:
 *                  type: string
 *                  description: result of test
 *              visitId:
 *                  type: number
 *                  description: ID of visit
 *          example:
 *              privateKey: ""
 *              name: ""
 *              result: ""
 *              visitId: 1
 *      GetTestResult:
 *          type: object
 *          required:
 *              - testId
 *          properties:
 *              testId:
 *                  type: number
 *                  description: ID of Test
 *          example:
 *              testId: 1
 *
 */

/**
 * @swagger
 * tags:
 *  name: TestResult
 *  description: Action to Test Result Contract
 */

/**
 * @swagger
 * /api/testResult/mint:
 *  post:
 *      summary: Mint Test Result token
 *      tags: [TestResult]
 *      requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MintTestResult'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/MintTestResult'
 */
router.post("/mint", mint);

/**
 * @swagger
 * /api/testResult/get:
 *  get:
 *      summary: Data of Test Result
 *      tags: [TestResult]
 *      parameters:
 *            - in: query
 *              name: testId
 *              schema:
 *                type: number
 *              required: true
 *              description: TestResult ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/GetTestResult'
 */
router.get("/get", getTestResult);

module.exports = router;
