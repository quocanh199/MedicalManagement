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
 *      MintPrescription:
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
 *                      type: number
 *                  description: list of medicine
 *              visitId:
 *                  type: number
 *                  description: ID of visit
 *          example:
 *              privateKey: ""
 *              listId: []
 *              amount: 1
 *      SetPrescription:
 *          type: object
 *          required:
 *              - privateKey
 *              - prescriptionId
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              prescriptionId:
 *                  type: number
 *                  description: ID of prescription
 *          example:
 *              privateKey: ""
 *              prescriptionId: 1
 *      GetPrescription:
 *          type: object
 *          required:
 *              - prescriptionId
 *          properties:
 *              prescriptionId:
 *                  type: number
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
 *                      $ref: '#/components/schemas/MintPrescription'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/MintPrescription'
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
 *                      $ref: '#/components/schemas/SetPrescription'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/SetPrescription'
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
 *                type: number
 *              required: true
 *              description: Prescription ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/GetPrescription'
 */
router.get("/get", getPrescription);

module.exports = router;
