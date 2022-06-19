const express = require("express");
const router = express.Router();

const {
  mint,
  setPaidPrescription,
  getPrescription,
} = require("../controller/prescription");

/**
 * @swagger
 * components:
 *  schemas:
 *      Mint:
 *          type: object
 *          required:
 *              - privateKey
 *              - listId
 *              - visitId
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              listId:
 *                  type: array
 *                  items:
 *                      type: int
 *                  description: list of medicine
 *              visitId:
 *                  type: int
 *                  description: ID of visit
 *          example:
 *              privateKey: ""
 *              listId: []
 *              amount: 1
 *      Set:
 *          type: object
 *          required:
 *              - privateKey
 *              - prescriptionId
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              prescriptionId:
 *                  type: int
 *                  description: ID of prescription
 *          example:
 *              privateKey: ""
 *              prescriptionId: 1
 *      Get:
 *          type: object
 *          required:
 *              - prescriptionId
 *          properties:
 *              prescriptionId:
 *                  type: int
 *                  description: ID of prescription
 *          example:
 *              prescription: 1
 *
 */

/**
 * @swagger
 * tags:
 *  name: Prescription
 *  description: Action to Prescription Contract
 */

/**
 * @swagger
 * /api/prescription/mint:
 *  post:
 *      summary: Mint Prescription token
 *      tags: [Prescription]
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
 * /api/prescription/setPaid:
 *  post:
 *      summary: Set paid for Prescription token
 *      tags: [Prescription]
 *      requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Set'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Set'
 */
router.post("/setPaid", setPaidPrescription);

/**
 * @swagger
 * /api/prescription/get:
 *  get:
 *      summary: Data of Prescription
 *      tags: [Prescription]
 *      parameters:
 *            - in: query
 *              name: prescriptionId
 *              schema:
 *                type: int
 *              required: true
 *              description: Prescription ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Get'
 */
router.get("/get", getMedicineHistory);

module.exports = router;
