const express = require("express");
const router = express.Router();

const {
  mint,
  getMedicine,
  getMedicineHistory,
  updateMedicine,
} = require("../controller/medicine");

/**
 * @swagger
 * components:
 *  schemas:
 *      MintMedicine:
 *          type: object
 *          required:
 *              - privateKey
 *              - name
 *              - amount
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              name:
 *                  type: string
 *                  description: Name of medicine
 *              amount:
 *                  type: number
 *                  description: Amount of medicine
 *          example:
 *              privateKey: ""
 *              name: ""
 *              amount: 1
 *      UpdateMedicine:
 *          type: object
 *          required:
 *              - privateKey
 *              - medicineId
 *              - name
 *              - amount
 *          properties:
 *              privateKey:
 *                  type: string
 *                  description: private key of authorized account
 *              medicineId:
 *                  type: number
 *                  description: ID of old medicine
 *              name:
 *                  type: string
 *                  description: Name of medicine
 *              amount:
 *                  type: number
 *                  description: Amount of medicine
 *          example:
 *              privateKey: ""
 *              medicineId: 1
 *              name: ""
 *              amount: 1
 *      GetMedicine:
 *          type: object
 *          required:
 *              - medicineId
 *          properties:
 *              medicineId:
 *                  type: number
 *                  description: ID of medicine
 *          example:
 *              medicineId: 1
 *
 */

/**
 * @swagger
 * tags:
 *  name: Medicine
 *  description: Action to Medicine Contract
 */

/**
 * @swagger
 * /api/medicine/mint:
 *  post:
 *      summary: Mint Medicine token
 *      tags: [Medicine]
 *      requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MintMedicine'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/MintMedicine'
 */
router.post("/mint", mint);

/**
 * @swagger
 * /api/medicine/update:
 *  post:
 *      summary: Update Medicine token
 *      tags: [Medicine]
 *      requestBody:
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateMedicine'
 *            required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/UpdateMedicine'
 */
router.post("/update", updateMedicine);

/**
 * @swagger
 * /api/medicine/getHistory:
 *  get:
 *      summary: History of Medicine's changes
 *      tags: [Medicine]
 *      parameters:
 *            - in: query
 *              name: medicineId
 *              schema:
 *                type: number
 *              required: true
 *              description: Medicine ID to get history
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/GetMedicine'
 */
router.get("/getHistory", getMedicineHistory);

/**
 * @swagger
 * /api/medicine/get:
 *  get:
 *      summary: Data of Medicine
 *      tags: [Medicine]
 *      parameters:
 *            - in: query
 *              name: medicineId
 *              schema:
 *                type: number
 *              required: true
 *              description: Medicine ID to get data
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/GetMedicine'
 */
router.get("/get", getMedicine);

module.exports = router;
